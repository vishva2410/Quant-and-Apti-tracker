export interface CheatSheetSection {
  title: string;
  type: 'formulas' | 'tricks' | 'patterns' | 'mistakes' | 'table';
  items: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface CheatSheet {
  dayNumber: number;
  title: string;
  topics: string[];
  readingTimeMinutes: number;
  sections: CheatSheetSection[];
}

export const cheatSheets: Record<number, CheatSheet> = {
  1: {
    dayNumber: 1,
    title: 'Foundations — Percentages, P&L, Blood Relations, Graphs',
    topics: ['Percentages', 'Profit & Loss', 'Blood Relations', 'Graph Traversal'],
    readingTimeMinutes: 5,
    sections: [
      {
        title: '⚡ Fraction ↔ Percentage Quick Map',
        type: 'table',
        items: [],
        table: {
          headers: ['Fraction', '%', 'Fraction', '%', 'Fraction', '%'],
          rows: [
            ['1/2', '50%', '1/6', '16.67%', '1/11', '9.09%'],
            ['1/3', '33.33%', '1/7', '14.28%', '1/12', '8.33%'],
            ['1/4', '25%', '1/8', '12.5%', '1/13', '7.69%'],
            ['1/5', '20%', '1/9', '11.11%', '1/14', '7.14%'],
            ['2/3', '66.67%', '1/10', '10%', '1/15', '6.67%'],
          ],
        },
      },
      {
        title: '📐 Core Formulas',
        type: 'formulas',
        items: [
          '% Change = (Change / Original) × 100',
          'Successive: a% then b% = (a + b + ab/100)%',
          'If A is x% more than B → B is (x / (100+x)) × 100% less than A',
          'Profit% = ((SP - CP) / CP) × 100',
          'SP = CP × (100 + Profit%) / 100',
          'Marked Price: SP = MP × (100 - Discount%) / 100',
          'Dishonest Dealer Gain% = (True Weight - False Weight) / False Weight × 100',
          'Buy X Get Y Free → Discount% = Y/(X+Y) × 100',
        ],
      },
      {
        title: '🧠 Speed Tricks',
        type: 'tricks',
        items: [
          'Multiplier Method: 20% increase → multiply by 1.2, 15% decrease → multiply by 0.85',
          'Two successive changes a%, b%: Net = a + b + ab/100 (works for profit + discount too)',
          'If profit = 25%, then CP:SP = 4:5. Think ratios, not percentages.',
          'Population after n years at r%: P(1 + r/100)ⁿ — same as CI formula',
          'For Blood Relations: ALWAYS draw the family tree. Never try to solve in your head.',
          'BFS = Level-order = Queue = Shortest path in unweighted. DFS = Stack/Recursion = Backtracking.',
        ],
      },
      {
        title: '🩸 Blood Relations Framework',
        type: 'patterns',
        items: [
          'Male symbols: father, brother, son, uncle, nephew, grandfather, husband',
          'Female symbols: mother, sister, daughter, aunt, niece, grandmother, wife',
          'Gender-neutral: cousin, sibling, parent, child, spouse',
          '"Pointing to photograph" → the person in photo is different from the speaker',
          'Coded relations: decode one pair first, then chain the relationships',
          'ALWAYS verify: count generations up/down and lateral connections',
        ],
      },
      {
        title: '🔀 BFS vs DFS Quick Compare',
        type: 'table',
        items: [],
        table: {
          headers: ['Property', 'BFS', 'DFS'],
          rows: [
            ['Data Structure', 'Queue', 'Stack / Recursion'],
            ['Order', 'Level by level', 'Go deep first'],
            ['Shortest Path', '✅ Yes (unweighted)', '❌ Not guaranteed'],
            ['Space', 'O(w) width', 'O(h) height'],
            ['Cycle Detection', 'Yes', 'Yes'],
            ['Topological Sort', 'Kahn\'s (BFS)', 'DFS + reverse finish'],
            ['Use When', 'Shortest path, nearest', 'Exhaustive search, backtrack'],
          ],
        },
      },
      {
        title: '⚠️ Common Mistakes',
        type: 'mistakes',
        items: [
          'Taking percentage on the WRONG BASE — always check: "% of WHAT?"',
          'Confusing Profit% on CP vs on SP — by default it\'s always on CP',
          'In successive discounts, you CANNOT simply add them: 20% + 10% ≠ 30%',
          'Blood Relations: Assuming gender from names — always go by the stated relation',
          'BFS/DFS: Forgetting to mark nodes as visited → infinite loops',
          'Graph: Assuming adjacency list order = traversal order (depends on implementation)',
        ],
      },
    ],
  },
  2: {
    dayNumber: 2,
    title: 'Core Arithmetic — Interest, Ratios, Seating, Complexity',
    topics: ['SI & CI', 'Ratio & Proportion', 'Seating Arrangement', 'Complexity Analysis'],
    readingTimeMinutes: 5,
    sections: [
      {
        title: '📐 SI & CI Formulas',
        type: 'formulas',
        items: [
          'SI = PNR/100 | Amount = P + SI = P(1 + NR/100)',
          'CI Amount = P(1 + R/100)ⁿ | CI = Amount - P',
          'Difference for 2 years: CI - SI = P(R/100)²',
          'Difference for 3 years: CI - SI = P×R²(300+R)/100³',
          'Half-yearly compounding: Rate → R/2, Time → 2N',
          'Effective Rate (compounded n times): (1 + R/100n)ⁿ - 1',
          'If SI doubles in T years → R = 100/T',
          'If CI doubles in T years → use Rule of 72: T ≈ 72/R',
        ],
      },
      {
        title: '⚖️ Ratio Speed Tricks',
        type: 'tricks',
        items: [
          'If a:b = 3:4 and b:c = 5:7 → make b common: a:b:c = 15:20:28',
          'Partnership: Profit share ∝ Capital × Time',
          'Alligation: (Cheaper qty)/(Dearer qty) = (d - m)/(m - c)',
          'Ages: "X years ago/hence" → just add/subtract from current variables',
          'Componendo-Dividendo: if a/b = c/d then (a+b)/(a-b) = (c+d)/(c-d)',
          'Ratio × Common multiplier = Actual values. Let ratio be x, solve for x.',
        ],
      },
      {
        title: '🪑 Seating Arrangement Approach',
        type: 'patterns',
        items: [
          'Circular: Fix 1 person → arrangements = (n-1)!',
          'Linear: Always mark LEFT and RIGHT from the sitter\'s perspective',
          'Start with DEFINITE clues (A sits 2nd from left) before RELATIVE ones (B is right of A)',
          'Use elimination: cross out impossible seats as you add constraints',
          'For circular + conditions: fix the most constrained person first',
          'Always verify: re-read ALL conditions after filling the arrangement',
        ],
      },
      {
        title: '⏱️ Complexity Cheat Table',
        type: 'table',
        items: [],
        table: {
          headers: ['Pattern', 'Time Complexity', 'Example'],
          rows: [
            ['Single loop 1..n', 'O(n)', 'Linear search'],
            ['Nested loop n×n', 'O(n²)', 'Bubble sort'],
            ['Loop halving', 'O(log n)', 'Binary search'],
            ['Loop + halving', 'O(n log n)', 'Merge sort'],
            ['All subsets', 'O(2ⁿ)', 'Subset sum'],
            ['All permutations', 'O(n!)', 'TSP brute force'],
            ['Master: T(n)=aT(n/b)+O(nᵈ)', 'Compare log_b(a) vs d', '3 cases'],
          ],
        },
      },
      {
        title: '⚠️ Common Mistakes',
        type: 'mistakes',
        items: [
          'Confusing SI and CI formulas — SI is linear (PNR/100), CI is exponential',
          'In half-yearly CI: don\'t forget to halve rate AND double time',
          'Ratio problems: forgetting that ratio doesn\'t give absolute values without extra info',
          'Seating: mixing up clockwise vs counterclockwise in circular arrangements',
          'Complexity: O(log n) base doesn\'t matter for Big-O (all log bases differ by constant)',
          'Recursion: forgetting to account for the merge/combine step in divide-and-conquer',
        ],
      },
    ],
  },
  3: {
    dayNumber: 3,
    title: 'Work & Logic — Time-Work, Pipes, Puzzles, Binary Search',
    topics: ['Time & Work', 'Pipes & Cisterns', 'Puzzles', 'Binary Search Logic'],
    readingTimeMinutes: 5,
    sections: [
      {
        title: '📐 Time & Work Formulas',
        type: 'formulas',
        items: [
          'If A does work in x days → A\'s 1-day work = 1/x',
          'LCM Method: Total work = LCM of individual times. Rate = Total/Time.',
          'A & B together: Rate_A + Rate_B. Time = Total Work / Combined Rate.',
          'If A is k times as efficient as B → Time ratio = 1:k (inverse)',
          'Alternate days: Calculate 2-day cycle output, then extrapolate',
          'Partial work: If A works for d days, work done = d × Rate_A',
          'M₁D₁H₁/W₁ = M₂D₂H₂/W₂ (Men-Days-Hours-Work relationship)',
        ],
      },
      {
        title: '🔧 Pipes & Cisterns Framework',
        type: 'tricks',
        items: [
          'Inlet = positive rate, Outlet/Leak = negative rate',
          'LCM method works exactly same as Time & Work',
          'If pipe fills in x hours and leak empties in y hours: Net = 1/x - 1/y',
          'Leak problems: Compare with and without leak → leak rate = difference',
          'Two inlets + one outlet: Net = Rate₁ + Rate₂ - Rate_outlet',
          'If cistern is 2/3 full: remaining work = 1/3, time = (1/3) / net_rate',
        ],
      },
      {
        title: '🧩 Puzzle-Solving Framework',
        type: 'patterns',
        items: [
          '1. Read ALL clues first before starting',
          '2. Identify definite clues (absolute position/value) — use these first',
          '3. Draw a grid/table for multi-variable puzzles',
          '4. Use elimination: mark ✗ for impossible combinations',
          '5. Chain deductions: A → B → C, use transitive logic',
          '6. If stuck, try case analysis on the most constrained variable',
          '7. Always verify ALL conditions after solving',
        ],
      },
      {
        title: '🔍 Binary Search Patterns',
        type: 'table',
        items: [],
        table: {
          headers: ['Pattern', 'Condition', 'Search Space'],
          rows: [
            ['Standard', 'arr[mid] == target', '[lo, hi]'],
            ['Lower Bound', 'First occurrence', 'Move hi = mid when found'],
            ['Upper Bound', 'Last occurrence', 'Move lo = mid when found'],
            ['Rotated Array', 'One half always sorted', 'Check sorted half first'],
            ['Min in Rotated', 'Compare mid with hi', 'Converge to minimum'],
            ['Peak Element', 'Compare mid neighbors', 'Move toward increase'],
            ['Answer Space', 'Binary search on answer', 'Check feasibility'],
          ],
        },
      },
      {
        title: '⚡ Binary Search Invariants',
        type: 'tricks',
        items: [
          'Loop condition: lo <= hi (inclusive) or lo < hi (exclusive right)',
          'Mid calculation: lo + (hi - lo) / 2 (avoids overflow)',
          'Convergence: ensure search space ALWAYS shrinks (lo = mid+1 or hi = mid-1)',
          'Post-condition: after loop, lo = hi + 1 (for lo <= hi style)',
          'For "answer on answer" problems: define check(x) → bool, find transition point',
          'Common trap: off-by-one errors at boundaries. Test with n=1, n=2 cases.',
        ],
      },
      {
        title: '⚠️ Common Mistakes',
        type: 'mistakes',
        items: [
          'Time & Work: Using wrong LCM — always take LCM of ALL given times',
          'Forgetting negative work — if someone undoes work (like a leak), subtract',
          'Pipes: Mixing up "fill" and "empty" signs. Inlet = +, Outlet = -. Always.',
          'Puzzles: Making assumptions beyond given clues. Only use what\'s stated.',
          'Binary Search: Infinite loop when lo = mid (use lo = mid + 1)',
          'Binary Search: Wrong comparison direction for descending sorted arrays',
        ],
      },
    ],
  },
};

export function getCheatSheet(dayNumber: number): CheatSheet | undefined {
  return cheatSheets[dayNumber];
}
