export interface ChallengeTemplate {
  starterCode: string;
  expectedOutput: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  hints: string[];
  templates: Record<string, ChallengeTemplate>;
}

export const CHALLENGES: Challenge[] = [
  {
    id: "sum-two-numbers",
    title: "Sum of Two Numbers",
    description: "Write a function that takes two numbers as arguments and returns their sum.",
    difficulty: "beginner",
    hints: ["Use the + operator to add the numbers together."],
    templates: {
      javascript: {
        starterCode: `function add(a, b) {\n  // Write your code here\n  \n}\n\nconsole.log(add(3, 5));`,
        expectedOutput: "8"
      },
      typescript: {
        starterCode: `function add(a: number, b: number): number {\n  // Write your code here\n  return 0;\n}\n\nconsole.log(add(3, 5));`,
        expectedOutput: "8"
      },
      python: {
        starterCode: `def add(a, b):\n    # Write your code here\n    pass\n\nprint(add(3, 5))`,
        expectedOutput: "8"
      },
      java: {
        starterCode: `class Main {\n    public static int add(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(add(3, 5));\n    }\n}`,
        expectedOutput: "8"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc add(a int, b int) int {\n\t// Write your code here\n\treturn 0\n}\n\nfunc main() {\n\tfmt.Println(add(3, 5))\n}`,
        expectedOutput: "8"
      },
      cpp: {
        starterCode: `#include <iostream>\n\nint add(int a, int b) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << add(3, 5) << std::endl;\n    return 0;\n}`,
        expectedOutput: "8"
      },
      rust: {
        starterCode: `fn add(a: i32, b: i32) -> i32 {\n    // Write your code here\n    0\n}\n\nfn main() {\n    println!("{}", add(3, 5));\n}`,
        expectedOutput: "8"
      }
    }
  },
  {
    id: "even-or-odd",
    title: "Even or Odd",
    description: "Write a function that takes an integer and returns 'Even' if it is even, and 'Odd' if it is odd.",
    difficulty: "beginner",
    hints: ["Use the modulo operator (%) to check if a number is divisible by 2."],
    templates: {
      javascript: {
        starterCode: `function isEvenOrOdd(n) {\n  // Write your code here\n  \n}\n\nconsole.log(isEvenOrOdd(4));\nconsole.log(isEvenOrOdd(7));`,
        expectedOutput: "Even\nOdd"
      },
      typescript: {
        starterCode: `function isEvenOrOdd(n: number): string {\n  // Write your code here\n  return "";\n}\n\nconsole.log(isEvenOrOdd(4));\nconsole.log(isEvenOrOdd(7));`,
        expectedOutput: "Even\nOdd"
      },
      python: {
        starterCode: `def is_even_or_odd(n):\n    # Write your code here\n    pass\n\nprint(is_even_or_odd(4))\nprint(is_even_or_odd(7))`,
        expectedOutput: "Even\nOdd"
      },
      java: {
        starterCode: `class Main {\n    public static String isEvenOrOdd(int n) {\n        // Write your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isEvenOrOdd(4));\n        System.out.println(isEvenOrOdd(7));\n    }\n}`,
        expectedOutput: "Even\nOdd"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc isEvenOrOdd(n int) string {\n\t// Write your code here\n\treturn \"\"\n}\n\nfunc main() {\n\tfmt.Println(isEvenOrOdd(4))\n\tfmt.Println(isEvenOrOdd(7))\n}`,
        expectedOutput: "Even\nOdd"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nstd::string isEvenOrOdd(int n) {\n    // Write your code here\n    return \"\";\n}\n\nint main() {\n    std::cout << isEvenOrOdd(4) << std::endl;\n    std::cout << isEvenOrOdd(7) << std::endl;\n    return 0;\n}`,
        expectedOutput: "Even\nOdd"
      },
      rust: {
        starterCode: `fn is_even_or_odd(n: i32) -> &'static str {\n    // Write your code here\n    ""\n}\n\nfn main() {\n    println!("{}", is_even_or_odd(4));\n    println!("{}", is_even_or_odd(7));\n}`,
        expectedOutput: "Even\nOdd"
      }
    }
  },
  {
    id: "reverse-string",
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    difficulty: "beginner",
    hints: ["Convert the string to an array, reverse the array, and join it back to a string."],
    templates: {
      javascript: {
        starterCode: `function reverseString(str) {\n  // Write your code here\n  \n}\n\nconsole.log(reverseString('hello'));`,
        expectedOutput: "olleh"
      },
      typescript: {
        starterCode: `function reverseString(str: string): string {\n  // Write your code here\n  return "";\n}\n\nconsole.log(reverseString('hello'));`,
        expectedOutput: "olleh"
      },
      python: {
        starterCode: `def reverse_string(s):\n    # Write your code here\n    pass\n\nprint(reverse_string('hello'))`,
        expectedOutput: "olleh"
      },
      java: {
        starterCode: `class Main {\n    public static String reverseString(String s) {\n        // Write your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(reverseString(\"hello\"));\n    }\n}`,
        expectedOutput: "olleh"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc reverseString(s string) string {\n\t// Write your code here\n\treturn \"\"\n}\n\nfunc main() {\n\tfmt.Println(reverseString(\"hello\"))\n}`,
        expectedOutput: "olleh"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nstd::string reverseString(std::string s) {\n    // Write your code here\n    return \"\";\n}\n\nint main() {\n    std::cout << reverseString(\"hello\") << std::endl;\n    return 0;\n}`,
        expectedOutput: "olleh"
      },
      rust: {
        starterCode: `fn reverse_string(s: &str) -> String {\n    // Write your code here\n    String::new()\n}\n\nfn main() {\n    println!("{}", reverse_string("hello"));\n}`,
        expectedOutput: "olleh"
      }
    }
  },
  {
    id: "find-maximum",
    title: "Find Maximum Element",
    description: "Write a function that finds the maximum element in an array of numbers.",
    difficulty: "beginner",
    hints: ["Iterate through the array keeping track of the largest number seen so far."],
    templates: {
      javascript: {
        starterCode: `function findMax(arr) {\n  // Write your code here\n  \n}\n\nconsole.log(findMax([1, 5, 3, 9, 2]));`,
        expectedOutput: "9"
      },
      typescript: {
        starterCode: `function findMax(arr: number[]): number {\n  // Write your code here\n  return 0;\n}\n\nconsole.log(findMax([1, 5, 3, 9, 2]));`,
        expectedOutput: "9"
      },
      python: {
        starterCode: `def find_max(arr):\n    # Write your code here\n    pass\n\nprint(find_max([1, 5, 3, 9, 2]))`,
        expectedOutput: "9"
      },
      java: {
        starterCode: `class Main {\n    public static int findMax(int[] arr) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 5, 3, 9, 2};\n        System.out.println(findMax(arr));\n    }\n}`,
        expectedOutput: "9"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc findMax(arr []int) int {\n\t// Write your code here\n\treturn 0\n}\n\nfunc main() {\n\tfmt.Println(findMax([]int{1, 5, 3, 9, 2}))\n}`,
        expectedOutput: "9"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint findMax(std::vector<int> arr) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << findMax({1, 5, 3, 9, 2}) << std::endl;\n    return 0;\n}`,
        expectedOutput: "9"
      },
      rust: {
        starterCode: `fn find_max(arr: &[i32]) -> i32 {\n    // Write your code here\n    0\n}\n\nfn main() {\n    println!("{}", find_max(&[1, 5, 3, 9, 2]));\n}`,
        expectedOutput: "9"
      }
    }
  },
  {
    id: "count-vowels",
    title: "Count Vowels",
    description: "Write a function that counts the number of vowels in a given string.",
    difficulty: "beginner",
    hints: ["Check each character to see if it is 'a', 'e', 'i', 'o', or 'u'."],
    templates: {
      javascript: {
        starterCode: `function countVowels(str) {\n  // Write your code here\n  \n}\n\nconsole.log(countVowels('hello world'));`,
        expectedOutput: "3"
      },
      typescript: {
        starterCode: `function countVowels(str: string): number {\n  // Write your code here\n  return 0;\n}\n\nconsole.log(countVowels('hello world'));`,
        expectedOutput: "3"
      },
      python: {
        starterCode: `def count_vowels(s):\n    # Write your code here\n    pass\n\nprint(count_vowels('hello world'))`,
        expectedOutput: "3"
      },
      java: {
        starterCode: `class Main {\n    public static int countVowels(String s) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(countVowels(\"hello world\"));\n    }\n}`,
        expectedOutput: "3"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc countVowels(s string) int {\n\t// Write your code here\n\treturn 0\n}\n\nfunc main() {\n\tfmt.Println(countVowels(\"hello world\"))\n}`,
        expectedOutput: "3"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint countVowels(std::string s) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << countVowels(\"hello world\") << std::endl;\n    return 0;\n}`,
        expectedOutput: "3"
      },
      rust: {
        starterCode: `fn count_vowels(s: &str) -> usize {\n    // Write your code here\n    0\n}\n\nfn main() {\n    println!("{}", count_vowels("hello world"));\n}`,
        expectedOutput: "3"
      }
    }
  },
  {
    id: "reverse-array",
    title: "Reverse Array",
    description: "Write a function that reverses an array in place or returns a new reversed array.",
    difficulty: "intermediate",
    hints: ["Use a two-pointer approach, swapping elements from start and end."],
    templates: {
      javascript: {
        starterCode: `function reverseArray(arr) {\n  // Write your code here\n  \n}\n\nconsole.log(reverseArray([1, 2, 3, 4, 5]));`,
        expectedOutput: "[ 5, 4, 3, 2, 1 ]"
      },
      typescript: {
        starterCode: `function reverseArray(arr: number[]): number[] {\n  // Write your code here\n  return [];\n}\n\nconsole.log(reverseArray([1, 2, 3, 4, 5]));`,
        expectedOutput: "[ 5, 4, 3, 2, 1 ]"
      },
      python: {
        starterCode: `def reverse_array(arr):\n    # Write your code here\n    pass\n\nprint(reverse_array([1, 2, 3, 4, 5]))`,
        expectedOutput: "[5, 4, 3, 2, 1]"
      },
      java: {
        starterCode: `import java.util.Arrays;\n\nclass Main {\n    public static int[] reverseArray(int[] arr) {\n        // Write your code here\n        return arr;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        System.out.println(Arrays.toString(reverseArray(arr)));\n    }\n}`,
        expectedOutput: "[5, 4, 3, 2, 1]"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc reverseArray(arr []int) []int {\n\t// Write your code here\n\treturn arr\n}\n\nfunc main() {\n\tfmt.Println(reverseArray([]int{1, 2, 3, 4, 5}))\n}`,
        expectedOutput: "[5 4 3 2 1]"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nstd::vector<int> reverseArray(std::vector<int> arr) {\n    // Write your code here\n    return arr;\n}\n\nint main() {\n    std::vector<int> res = reverseArray({1, 2, 3, 4, 5});\n    std::cout << \"[\";\n    for (size_t i = 0; i < res.size(); i++) {\n        std::cout << res[i];\n        if (i < res.size() - 1) std::cout << \", \";\n    }\n    std::cout << \"]\" << std::endl;\n    return 0;\n}`,
        expectedOutput: "[5, 4, 3, 2, 1]"
      },
      rust: {
        starterCode: `fn reverse_array(mut arr: Vec<i32>) -> Vec<i32> {\n    // Write your code here\n    arr\n}\n\nfn main() {\n    println!("{:?}", reverse_array(vec![1, 2, 3, 4, 5]));\n}`,
        expectedOutput: "[5, 4, 3, 2, 1]"
      }
    }
  },
  {
    id: "fizzbuzz",
    title: "FizzBuzz",
    description: "Print numbers from 1 to 20. If divisible by 3 print Fizz, by 5 print Buzz, by both print FizzBuzz.",
    difficulty: "intermediate",
    hints: ["Check divisibility by 15 first (3 and 5), then 3, then 5."],
    templates: {
      javascript: {
        starterCode: `function fizzBuzz() {\n  // Write your code here\n  \n}\n\nfizzBuzz();`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      },
      typescript: {
        starterCode: `function fizzBuzz(): void {\n  // Write your code here\n  \n}\n\nfizzBuzz();`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      },
      python: {
        starterCode: `def fizz_buzz():\n    # Write your code here\n    pass\n\nfizz_buzz()`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      },
      java: {
        starterCode: `class Main {\n    public static void fizzBuzz() {\n        // Write your code here\n        \n    }\n\n    public static void main(String[] args) {\n        fizzBuzz();\n    }\n}`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc fizzBuzz() {\n\t// Write your code here\n\t\n}\n\nfunc main() {\n\tfizzBuzz()\n}`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      },
      cpp: {
        starterCode: `#include <iostream>\n\nvoid fizzBuzz() {\n    // Write your code here\n    \n}\n\nint main() {\n    fizzBuzz();\n    return 0;\n}`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      },
      rust: {
        starterCode: `fn fizz_buzz() {\n    // Write your code here\n}\n\nfn main() {\n    fizz_buzz();\n}`,
        expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz"
      }
    }
  },
  {
    id: "palindrome-check",
    title: "Palindrome Check",
    description: "Write a function that checks if a given string is a palindrome (reads the same forwards and backwards).",
    difficulty: "intermediate",
    hints: ["Compare the string with its reversed version.", "Consider using two pointers from start and end."],
    templates: {
      javascript: {
        starterCode: `function isPalindrome(str) {\n  // Write your code here\n  \n}\n\nconsole.log(isPalindrome('racecar'));\nconsole.log(isPalindrome('hello'));`,
        expectedOutput: "true\nfalse"
      },
      typescript: {
        starterCode: `function isPalindrome(str: string): boolean {\n  // Write your code here\n  return false;\n}\n\nconsole.log(isPalindrome('racecar'));\nconsole.log(isPalindrome('hello'));`,
        expectedOutput: "true\nfalse"
      },
      python: {
        starterCode: `def is_palindrome(s):\n    # Write your code here\n    pass\n\nprint(is_palindrome('racecar'))\nprint(is_palindrome('hello'))`,
        expectedOutput: "True\nFalse"
      },
      java: {
        starterCode: `class Main {\n    public static boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"racecar\"));\n        System.out.println(isPalindrome(\"hello\"));\n    }\n}`,
        expectedOutput: "true\nfalse"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc isPalindrome(s string) bool {\n\t// Write your code here\n\treturn false\n}\n\nfunc main() {\n\tfmt.Println(isPalindrome(\"racecar\"))\n\tfmt.Println(isPalindrome(\"hello\"))\n}`,
        expectedOutput: "true\nfalse"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nbool isPalindrome(std::string s) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << isPalindrome(\"racecar\") << std::endl;\n    std::cout << isPalindrome(\"hello\") << std::endl;\n    return 0;\n}`,
        expectedOutput: "true\nfalse"
      },
      rust: {
        starterCode: `fn is_palindrome(s: &str) -> bool {\n    // Write your code here\n    false\n}\n\nfn main() {\n    println!("{}", is_palindrome("racecar"));\n    println!("{}", is_palindrome("hello"));\n}`,
        expectedOutput: "true\nfalse"
      }
    }
  },
  {
    id: "two-sum",
    title: "Two Sum",
    description: "Given an array of integers and a target sum, return the indices of the two numbers that add up to the target.",
    difficulty: "intermediate",
    hints: ["Use a hash map to store previously seen numbers and their indices."],
    templates: {
      javascript: {
        starterCode: `function twoSum(nums, target) {\n  // Write your code here\n  \n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`,
        expectedOutput: "[ 0, 1 ]"
      },
      typescript: {
        starterCode: `function twoSum(nums: number[], target: number): number[] {\n  // Write your code here\n  return [];\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`,
        expectedOutput: "[ 0, 1 ]"
      },
      python: {
        starterCode: `def two_sum(nums, target):\n    # Write your code here\n    pass\n\nprint(two_sum([2, 7, 11, 15], 9))`,
        expectedOutput: "[0, 1]"
      },
      java: {
        starterCode: `import java.util.Arrays;\n\nclass Main {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 7, 11, 15};\n        System.out.println(Arrays.toString(twoSum(nums, 9)));\n    }\n}`,
        expectedOutput: "[0, 1]"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc twoSum(nums []int, target int) []int {\n\t// Write your code here\n\treturn []int{}\n}\n\nfunc main() {\n\tfmt.Println(twoSum([]int{2, 7, 11, 15}, 9))\n}`,
        expectedOutput: "[0 1]"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nstd::vector<int> twoSum(std::vector<int> nums, int target) {\n    // Write your code here\n    return {};\n}\n\nint main() {\n    std::vector<int> res = twoSum({2, 7, 11, 15}, 9);\n    std::cout << \"[\";\n    for (size_t i = 0; i < res.size(); i++) {\n        std::cout << res[i];\n        if (i < res.size() - 1) std::cout << \", \";\n    }\n    std::cout << \"]\" << std::endl;\n    return 0;\n}`,
        expectedOutput: "[0, 1]"
      },
      rust: {
        starterCode: `fn two_sum(nums: &[i32], target: i32) -> Vec<usize> {\n    // Write your code here\n    vec![]\n}\n\nfn main() {\n    println!("{:?}", two_sum(&[2, 7, 11, 15], 9));\n}`,
        expectedOutput: "[0, 1]"
      }
    }
  },
  {
    id: "remove-duplicates",
    title: "Remove Duplicates",
    description: "Given a sorted array, remove duplicates in-place or return a new array with unique elements.",
    difficulty: "intermediate",
    hints: ["Since the array is sorted, duplicates will be adjacent.", "Use a second pointer to keep track of the position of unique elements."],
    templates: {
      javascript: {
        starterCode: `function removeDuplicates(nums) {\n  // Write your code here\n  \n}\n\nconsole.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));`,
        expectedOutput: "[ 1, 2, 3, 4, 5 ]"
      },
      typescript: {
        starterCode: `function removeDuplicates(nums: number[]): number[] {\n  // Write your code here\n  return [];\n}\n\nconsole.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));`,
        expectedOutput: "[ 1, 2, 3, 4, 5 ]"
      },
      python: {
        starterCode: `def remove_duplicates(nums):\n    # Write your code here\n    pass\n\nprint(remove_duplicates([1, 2, 2, 3, 4, 4, 5]))`,
        expectedOutput: "[1, 2, 3, 4, 5]"
      },
      java: {
        starterCode: `import java.util.Arrays;\n\nclass Main {\n    public static int[] removeDuplicates(int[] nums) {\n        // Write your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 2, 3, 4, 4, 5};\n        System.out.println(Arrays.toString(removeDuplicates(nums)));\n    }\n}`,
        expectedOutput: "[1, 2, 3, 4, 5]"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc removeDuplicates(nums []int) []int {\n\t// Write your code here\n\treturn []int{}\n}\n\nfunc main() {\n\tfmt.Println(removeDuplicates([]int{1, 2, 2, 3, 4, 4, 5}))\n}`,
        expectedOutput: "[1 2 3 4 5]"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nstd::vector<int> removeDuplicates(std::vector<int> nums) {\n    // Write your code here\n    return {};\n}\n\nint main() {\n    std::vector<int> res = removeDuplicates({1, 2, 2, 3, 4, 4, 5});\n    std::cout << \"[\";\n    for (size_t i = 0; i < res.size(); i++) {\n        std::cout << res[i];\n        if (i < res.size() - 1) std::cout << \", \";\n    }\n    std::cout << \"]\" << std::endl;\n    return 0;\n}`,
        expectedOutput: "[1, 2, 3, 4, 5]"
      },
      rust: {
        starterCode: `fn remove_duplicates(arr: &[i32]) -> Vec<i32> {\n    // Write your code here\n    vec![]\n}\n\nfn main() {\n    println!("{:?}", remove_duplicates(&[1, 2, 2, 3, 4, 4, 5]));\n}`,
        expectedOutput: "[1, 2, 3, 4, 5]"
      }
    }
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    difficulty: "advanced",
    hints: ["Use dynamic programming.", "Maintain an array where dp[i] is the length of the LIS ending at index i."],
    templates: {
      javascript: {
        starterCode: `function lengthOfLIS(nums) {\n  // Write your code here\n  \n}\n\nconsole.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));`,
        expectedOutput: "4"
      },
      typescript: {
        starterCode: `function lengthOfLIS(nums: number[]): number {\n  // Write your code here\n  return 0;\n}\n\nconsole.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));`,
        expectedOutput: "4"
      },
      python: {
        starterCode: `def length_of_lis(nums):\n    # Write your code here\n    pass\n\nprint(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))`,
        expectedOutput: "4"
      },
      java: {
        starterCode: `class Main {\n    public static int lengthOfLIS(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};\n        System.out.println(lengthOfLIS(nums));\n    }\n}`,
        expectedOutput: "4"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc lengthOfLIS(nums []int) int {\n\t// Write your code here\n\treturn 0\n}\n\nfunc main() {\n\tfmt.Println(lengthOfLIS([]int{10, 9, 2, 5, 3, 7, 101, 18}))\n}`,
        expectedOutput: "4"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint lengthOfLIS(std::vector<int> nums) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << lengthOfLIS({10, 9, 2, 5, 3, 7, 101, 18}) << std::endl;\n    return 0;\n}`,
        expectedOutput: "4"
      },
      rust: {
        starterCode: `fn length_of_lis(nums: &[i32]) -> usize {\n    // Write your code here\n    0\n}\n\nfn main() {\n    println!("{}", length_of_lis(&[10, 9, 2, 5, 3, 7, 101, 18]));\n}`,
        expectedOutput: "4"
      }
    }
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "advanced",
    hints: ["Use a stack to keep track of opening brackets.", "When you encounter a closing bracket, check if it matches the top of the stack."],
    templates: {
      javascript: {
        starterCode: `function isValid(s) {\n  // Write your code here\n  \n}\n\nconsole.log(isValid('()[]{}'));\nconsole.log(isValid('(]'));`,
        expectedOutput: "true\nfalse"
      },
      typescript: {
        starterCode: `function isValid(s: string): boolean {\n  // Write your code here\n  return false;\n}\n\nconsole.log(isValid('()[]{}'));\nconsole.log(isValid('(]'));`,
        expectedOutput: "true\nfalse"
      },
      python: {
        starterCode: `def is_valid(s):\n    # Write your code here\n    pass\n\nprint(is_valid('()[]{}'))\nprint(is_valid('(]'))`,
        expectedOutput: "True\nFalse"
      },
      java: {
        starterCode: `class Main {\n    public static boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isValid(\"()[]{}\"));\n        System.out.println(isValid(\"(]\"));\n    }\n}`,
        expectedOutput: "true\nfalse"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc isValid(s string) bool {\n\t// Write your code here\n\treturn false\n}\n\nfunc main() {\n\tfmt.Println(isValid(\"()[]{}\"))\n\tfmt.Println(isValid(\"(]\"))\n}`,
        expectedOutput: "true\nfalse"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nbool isValid(std::string s) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << isValid(\"()[]{}\") << std::endl;\n    std::cout << isValid(\"(]\") << std::endl;\n    return 0;\n}`,
        expectedOutput: "true\nfalse"
      },
      rust: {
        starterCode: `fn is_valid(s: &str) -> bool {\n    // Write your code here\n    false\n}\n\nfn main() {\n    println!("{}", is_valid("()[]{}"));\n    println!("{}", is_valid("(]"));\n}`,
        expectedOutput: "true\nfalse"
      }
    }
  },
  {
    id: "merge-sorted-arrays",
    title: "Merge Sorted Arrays",
    description: "Given two sorted arrays, merge them into a single sorted array.",
    difficulty: "advanced",
    hints: ["Use two pointers, one for each array, and compare elements to build the merged array."],
    templates: {
      javascript: {
        starterCode: `function mergeArrays(arr1, arr2) {\n  // Write your code here\n  \n}\n\nconsole.log(mergeArrays([1, 3, 5], [2, 4, 6]));`,
        expectedOutput: "[ 1, 2, 3, 4, 5, 6 ]"
      },
      typescript: {
        starterCode: `function mergeArrays(arr1: number[], arr2: number[]): number[] {\n  // Write your code here\n  return [];\n}\n\nconsole.log(mergeArrays([1, 3, 5], [2, 4, 6]));`,
        expectedOutput: "[ 1, 2, 3, 4, 5, 6 ]"
      },
      python: {
        starterCode: `def merge_arrays(arr1, arr2):\n    # Write your code here\n    pass\n\nprint(merge_arrays([1, 3, 5], [2, 4, 6]))`,
        expectedOutput: "[1, 2, 3, 4, 5, 6]"
      },
      java: {
        starterCode: `import java.util.Arrays;\n\nclass Main {\n    public static int[] mergeArrays(int[] arr1, int[] arr2) {\n        // Write your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] arr1 = {1, 3, 5};\n        int[] arr2 = {2, 4, 6};\n        System.out.println(Arrays.toString(mergeArrays(arr1, arr2)));\n    }\n}`,
        expectedOutput: "[1, 2, 3, 4, 5, 6]"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc mergeArrays(arr1 []int, arr2 []int) []int {\n\t// Write your code here\n\treturn []int{}\n}\n\nfunc main() {\n\tfmt.Println(mergeArrays([]int{1, 3, 5}, []int{2, 4, 6}))\n}`,
        expectedOutput: "[1 2 3 4 5 6]"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nstd::vector<int> mergeArrays(std::vector<int> arr1, std::vector<int> arr2) {\n    // Write your code here\n    return {};\n}\n\nint main() {\n    std::vector<int> res = mergeArrays({1, 3, 5}, {2, 4, 6});\n    std::cout << \"[\";\n    for (size_t i = 0; i < res.size(); i++) {\n        std::cout << res[i];\n        if (i < res.size() - 1) std::cout << \", \";\n    }\n    std::cout << \"]\" << std::endl;\n    return 0;\n}`,
        expectedOutput: "[1, 2, 3, 4, 5, 6]"
      },
      rust: {
        starterCode: `fn merge_arrays(arr1: &[i32], arr2: &[i32]) -> Vec<i32> {\n    // Write your code here\n    vec![]\n}\n\nfn main() {\n    println!("{:?}", merge_arrays(&[1, 3, 5], &[2, 4, 6]));\n}`,
        expectedOutput: "[1, 2, 3, 4, 5, 6]"
      }
    }
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Given an array of integers sorted in ascending order and a target value, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    difficulty: "advanced",
    hints: ["Use a left and right pointer.", "Calculate the middle index and compare the middle element with the target."],
    templates: {
      javascript: {
        starterCode: `function search(nums, target) {\n  // Write your code here\n  \n}\n\nconsole.log(search([-1, 0, 3, 5, 9, 12], 9));\nconsole.log(search([-1, 0, 3, 5, 9, 12], 2));`,
        expectedOutput: "4\n-1"
      },
      typescript: {
        starterCode: `function search(nums: number[], target: number): number {\n  // Write your code here\n  return -1;\n}\n\nconsole.log(search([-1, 0, 3, 5, 9, 12], 9));\nconsole.log(search([-1, 0, 3, 5, 9, 12], 2));`,
        expectedOutput: "4\n-1"
      },
      python: {
        starterCode: `def search(nums, target):\n    # Write your code here\n    pass\n\nprint(search([-1, 0, 3, 5, 9, 12], 9))\nprint(search([-1, 0, 3, 5, 9, 12], 2))`,
        expectedOutput: "4\n-1"
      },
      java: {
        starterCode: `class Main {\n    public static int search(int[] nums, int target) {\n        // Write your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {-1, 0, 3, 5, 9, 12};\n        System.out.println(search(nums, 9));\n        System.out.println(search(nums, 2));\n    }\n}`,
        expectedOutput: "4\n-1"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc search(nums []int, target int) int {\n\t// Write your code here\n\treturn -1\n}\n\nfunc main() {\n\tfmt.Println(search([]int{-1, 0, 3, 5, 9, 12}, 9))\n\tfmt.Println(search([]int{-1, 0, 3, 5, 9, 12}, 2))\n}`,
        expectedOutput: "4\n-1"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint search(std::vector<int> nums, int target) {\n    // Write your code here\n    return -1;\n}\n\nint main() {\n    std::cout << search({-1, 0, 3, 5, 9, 12}, 9) << std::endl;\n    std::cout << search({-1, 0, 3, 5, 9, 12}, 2) << std::endl;\n    return 0;\n}`,
        expectedOutput: "4\n-1"
      },
      rust: {
        starterCode: `fn search(nums: &[i32], target: i32) -> i32 {\n    // Write your code here\n    -1\n}\n\nfn main() {\n    println!("{}", search(&[-1, 0, 3, 5, 9, 12], 9));\n    println!("{}", search(&[-1, 0, 3, 5, 9, 12], 2));\n}`,
        expectedOutput: "4\n-1"
      }
    }
  },
  {
    id: "maximum-subarray-sum",
    title: "Maximum Subarray Sum",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    difficulty: "advanced",
    hints: ["Use Kadane's algorithm.", "Keep track of the maximum sum ending at the current position and the global maximum sum."],
    templates: {
      javascript: {
        starterCode: `function maxSubArray(nums) {\n  // Write your code here\n  \n}\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
        expectedOutput: "6"
      },
      typescript: {
        starterCode: `function maxSubArray(nums: number[]): number {\n  // Write your code here\n  return 0;\n}\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
        expectedOutput: "6"
      },
      python: {
        starterCode: `def max_sub_array(nums):\n    # Write your code here\n    pass\n\nprint(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`,
        expectedOutput: "6"
      },
      java: {
        starterCode: `class Main {\n    public static int maxSubArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(maxSubArray(nums));\n    }\n}`,
        expectedOutput: "6"
      },
      go: {
        starterCode: `package main\n\nimport "fmt"\n\nfunc maxSubArray(nums []int) int {\n\t// Write your code here\n\treturn 0\n}\n\nfunc main() {\n\tfmt.Println(maxSubArray([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}))\n}`,
        expectedOutput: "6"
      },
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint maxSubArray(std::vector<int> nums) {\n    // Write your code here\n    return 0;\n}\n\nint main() {\n    std::cout << maxSubArray({-2, 1, -3, 4, -1, 2, 1, -5, 4}) << std::endl;\n    return 0;\n}`,
        expectedOutput: "6"
      },
      rust: {
        starterCode: `fn max_sub_array(nums: &[i32]) -> i32 {\n    // Write your code here\n    0\n}\n\nfn main() {\n    println!("{}", max_sub_array(&[-2, 1, -3, 4, -1, 2, 1, -5, 4]));\n}`,
        expectedOutput: "6"
      }
    }
  }
];
