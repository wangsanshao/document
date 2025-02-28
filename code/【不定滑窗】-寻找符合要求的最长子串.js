/**
 *题⽬描述
给定⼀个字符串 s ，找出这样⼀个⼦串：
1. 该⼦串中的任意⼀个字符最多出现 2 次；
2. 该⼦串不包含指定某个字符；
请你找出满⾜该条件的最⻓⼦串的⻓度。
 */


function findLongestValidSubstring(s, excludeChar) {
  // 如果字符串为空，直接返回0
  if (!s) return 0;
  
  let left = 0;  // 窗口左边界
  let maxLength = 0;  // 最长子串长度
  let charCount = new Map();  // 记录字符出现次数
  
  // 遍历字符串，right为窗口右边界
  for (let right = 0; right < s.length; right++) {
      const currentChar = s[right];
      
      // 如果遇到需要排除的字符，重置窗口
      if (currentChar === excludeChar) {
          left = right + 1;
          charCount.clear();
          continue;
      }
      
      // 更新字符计数
      charCount.set(currentChar, (charCount.get(currentChar) || 0) + 1);
      
      // 当某个字符出现次数超过2次时，需要收缩窗口
      while (charCount.get(currentChar) > 2) {
          const leftChar = s[left];
          charCount.set(leftChar, charCount.get(leftChar) - 1);
          if (charCount.get(leftChar) === 0) {
              charCount.delete(leftChar);
          }
          left++;
      }
      
      // 更新最大长度
      maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}
console.log(findLongestValidSubstring('ABCD1231123', 'D'))
