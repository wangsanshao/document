# DatePicker 实现原理与难点分析

## 一、基础实现

### 1. 核心数据结构
```typescript
interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  format?: string;
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
  showTime?: boolean;
  mode?: 'date' | 'month' | 'year' | 'decade';
}

interface DatePickerState {
  visible: boolean;
  viewDate: Date;  // 当前视图日期
  selectedDate: Date | null;
  mode: 'date' | 'month' | 'year' | 'decade';
}
```

### 2. 日期面板生成
```typescript
class DatePanel {
  // 生成日历网格数据
  generateCalendarDays(year: number, month: number): Date[][] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: Date[][] = [];
    
    // 获取当月第一天是星期几
    const firstDayWeek = firstDay.getDay();
    // 获取当月天数
    const daysInMonth = lastDay.getDate();
    
    let currentWeek: Date[] = [];
    
    // 填充上月剩余日期
    const prevMonth = new Date(year, month - 1);
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      currentWeek.push(
        new Date(year, month - 1, daysInPrevMonth - i)
      );
    }
    
    // 填充当月日期
    for (let day = 1; day <= daysInMonth; day++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(year, month, day));
    }
    
    // 填充下月日期
    let nextMonthDay = 1;
    while (currentWeek.length < 7) {
      currentWeek.push(
        new Date(year, month + 1, nextMonthDay++)
      );
    }
    weeks.push(currentWeek);
    
    return weeks;
  }
}
```

### 3. 基础组件实现
```typescript
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  disabled,
  disabledDate,
  showTime,
  mode = 'date'
}) => {
  const [state, setState] = useState<DatePickerState>({
    visible: false,
    viewDate: value || new Date(),
    selectedDate: value,
    mode
  });

  // 处理日期选择
  const handleDateSelect = (date: Date) => {
    if (disabledDate?.(date)) return;
    
    setState(prev => ({
      ...prev,
      selectedDate: date,
      visible: !showTime // 如果显示时间，则不关闭面板
    }));
    
    onChange?.(date);
  };

  // 渲染日历面板
  const renderCalendar = () => {
    const weeks = generateCalendarDays(
      state.viewDate.getFullYear(),
      state.viewDate.getMonth()
    );

    return (
      <div className="calendar-panel">
        {renderHeader()}
        {renderWeekDays()}
        {weeks.map((week, i) => (
          <div key={i} className="week-row">
            {week.map((date, j) => (
              <div
                key={j}
                className={getDateClassName(date)}
                onClick={() => handleDateSelect(date)}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
};
```

## 二、难点分析

### 1. 日期计算
```typescript
class DateCalculator {
  // 处理跨月份日期选择
  handleCrossMonthSelect(date: Date, viewDate: Date): Date {
    const monthDiff = (
      date.getFullYear() - viewDate.getFullYear()
    ) * 12 + date.getMonth() - viewDate.getMonth();
    
    if (monthDiff !== 0) {
      return new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + monthDiff,
        1
      );
    }
    return viewDate;
  }

  // 处理农历计算
  calculateLunarDate(date: Date): string {
    // 农历转换算法
    const lunar = convertToLunar(date);
    return formatLunar(lunar);
  }
}
```

### 2. 时区处理
```typescript
class TimeZoneHandler {
  // 转换为目标时区
  toTargetTimeZone(date: Date, targetTimeZone: string): Date {
    const targetTime = new Date(date.toLocaleString('en-US', {
      timeZone: targetTimeZone
    }));
    
    const diff = date.getTime() - targetTime.getTime();
    return new Date(date.getTime() + diff);
  }

  // 处理夏令时
  handleDaylightSaving(date: Date): Date {
    const january = new Date(date.getFullYear(), 0, 1);
    const july = new Date(date.getFullYear(), 6, 1);
    
    const stdTimezoneOffset = Math.max(
      january.getTimezoneOffset(),
      july.getTimezoneOffset()
    );
    
    const isDaylightSaving = date.getTimezoneOffset() < stdTimezoneOffset;
    if (isDaylightSaving) {
      return new Date(date.getTime() + 3600000); // 加一小时
    }
    return date;
  }
}
```

### 3. 范围选择
```typescript
class RangeSelector {
  // 处理日期范围选择
  handleRangeSelect(
    startDate: Date | null,
    endDate: Date | null,
    currentDate: Date
  ): [Date | null, Date | null] {
    if (!startDate) return [currentDate, null];
    if (!endDate && currentDate >= startDate) {
      return [startDate, currentDate];
    }
    return [currentDate, null];
  }

  // 判断日期是否在范围内
  isInRange(date: Date, start: Date, end: Date): boolean {
    return date >= start && date <= end;
  }
}
```

### 4. 性能优化
```typescript
class DatePickerOptimization {
  // 缓存日历数据
  @memoize
  generateCalendarData(year: number, month: number) {
    return this.generateCalendarDays(year, month);
  }

  // 优化重渲染
  shouldComponentUpdate(
    nextProps: DatePickerProps,
    nextState: DatePickerState
  ): boolean {
    return (
      !isEqual(this.props.value, nextProps.value) ||
      !isEqual(this.state.viewDate, nextState.viewDate) ||
      this.state.visible !== nextState.visible
    );
  }
}
```

## 三、主要难点总结

1. **日期计算复杂性**
   - 跨月份、跨年份处理
   - 农历日期转换
   - 节假日处理
   - 闰年计算

2. **时区处理**
   - 多时区支持
   - 夏令时处理
   - UTC 转换

3. **日期范围选择**
   - 范围选择逻辑
   - 范围验证
   - 禁用日期处理

4. **性能优化**
   - 大量日期计算
   - 频繁重渲染
   - 日历数据缓存

5. **交互体验**
   - 键盘操作支持
   - 快捷选择
   - 自定义格式

## 四、优化建议

1. **计算优化**
   - 使用缓存减少重复计算
   - 采用虚拟滚动处理大量数据
   - 懒加载非当前月份数据

2. **渲染优化**
   - 组件拆分
   - 使用 memo 优化
   - 合理使用 shouldComponentUpdate

3. **交互优化**
   - 添加快捷键支持
   - 优化移动端体验
   - 提供更多自定义选项

4. **可访问性**
   - 键盘导航
   - 屏幕阅读器支持
   - ARIA 属性支持
