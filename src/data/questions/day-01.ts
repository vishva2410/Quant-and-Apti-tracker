import type { Question } from '@/types';

export const day01Questions: Question[] = [
  {
    "id": "d1-s1-q1",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 1,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Population Growth",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Infosys",
      "TCS"
    ],
    "content": {
      "text": "The population of a town increases by 10% annually. If its present population is 12,100, what was its population 2 years ago?"
    },
    "options": [
      {
        "id": "a",
        "text": "10,000"
      },
      {
        "id": "b",
        "text": "11,000"
      },
      {
        "id": "c",
        "text": "12,000"
      },
      {
        "id": "d",
        "text": "9,000"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let the population 2 years ago be P. According to the formula for compound growth: P * (1 + 10/100)^2 = 12100. P * (1.1)^2 = 12100. P * 1.21 = 12100. P = 12100 / 1.21 = 10000.",
      "shortTrick": "10% increase for 2 years is equivalent to a single increase of 21%. 121% of P = 12100, so P = 10000.",
      "commonMistake": "Calculating 20% flat decrease from 12100.",
      "timeSavingTip": "Memorize equivalent percentage changes for 10% (10, 21, 33.1)."
    },
    "hints": [
      "Think of it as compound interest."
    ]
  },
  {
    "id": "d1-s1-q2",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 2,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Successive Changes",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Amazon",
      "Walmart"
    ],
    "content": {
      "text": "The price of an article is first increased by 20% and then decreased by 15%. If the final price is $510, what was the original price?"
    },
    "options": [
      {
        "id": "a",
        "text": "$480"
      },
      {
        "id": "b",
        "text": "$500"
      },
      {
        "id": "c",
        "text": "$520"
      },
      {
        "id": "d",
        "text": "$490"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the original price be x. After 20% increase, price = 1.2x. After 15% decrease, price = 1.2x * 0.85 = 1.02x. Given 1.02x = 510. x = 510 / 1.02 = 500.",
      "shortTrick": "Net effect = 20 - 15 - (20*15)/100 = 5 - 3 = +2%. So, 102% is 510, 100% is 500.",
      "commonMistake": "Thinking 20% up and 15% down means 5% up overall without compounding.",
      "timeSavingTip": "Use successive percentage formula: a + b + ab/100."
    },
    "hints": [
      "Use the successive percentage formula: a + b + (ab/100)"
    ]
  },
  {
    "id": "d1-s1-q3",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 3,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Percentage of Percentage",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Microsoft",
      "Oracle"
    ],
    "content": {
      "text": "In an election between two candidates, 10% of voters did not cast their vote and 10% of votes cast were found invalid. The winning candidate got 54% of valid votes and won by 1620 votes. Find the total number of voters enrolled."
    },
    "options": [
      {
        "id": "a",
        "text": "25000"
      },
      {
        "id": "b",
        "text": "22500"
      },
      {
        "id": "c",
        "text": "20000"
      },
      {
        "id": "d",
        "text": "27500"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let total voters = 100x. Votes cast = 90x. Valid votes = 90x * 0.9 = 81x. Winner gets 54% of valid, loser gets 46% of valid. Difference = 8% of valid votes. 8% of 81x = 1620. (8/100) * 81x = 1620. x = (1620 * 100) / (8 * 81) = 250. Total voters = 100x = 25000.",
      "shortTrick": "Winner diff is 8%. Valid votes = 1620 / 0.08 = 20250. This is 81% of total. Total = 20250 / 0.81 = 25000.",
      "commonMistake": "Calculating winner's 54% on total votes instead of valid votes.",
      "timeSavingTip": "Work backwards: Diff -> Valid -> Cast -> Total."
    },
    "hints": [
      "Work systematically from total voters to valid votes."
    ]
  },
  {
    "id": "d1-s1-q4",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 4,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Venn Diagrams / Sets",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Goldman Sachs",
      "Google"
    ],
    "content": {
      "text": "In a survey of 500 students, 60% like Math, 50% like Physics, and 40% like Chemistry. 30% like both Math and Physics, 20% like Physics and Chemistry, and 25% like Math and Chemistry. If 10% like none of the subjects, how many students like exactly two subjects?"
    },
    "options": [
      {
        "id": "a",
        "text": "150"
      },
      {
        "id": "b",
        "text": "125"
      },
      {
        "id": "c",
        "text": "135"
      },
      {
        "id": "d",
        "text": "105"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Total = 500. Like at least one = 90% of 500 = 450. Math(M)=300, Physics(P)=250, Chemistry(C)=200. M∩P=150, P∩C=100, M∩C=125. Use union formula: 450 = 300 + 250 + 200 - (150 + 100 + 125) + M∩P∩C. 450 = 750 - 375 + M∩P∩C. M∩P∩C = 75. Exactly two = (M∩P - M∩P∩C) + (P∩C - M∩P∩C) + (M∩C - M∩P∩C) = (150-75) + (100-75) + (125-75) = 75 + 25 + 50 = 150.",
      "shortTrick": "Union = Sum(1) - Sum(2) + Sum(3). Exactly 2 = Sum(2) - 3*Sum(3). 375 - 3(75) = 375 - 225 = 150.",
      "commonMistake": "Summing M∩P, P∩C, M∩C and forgetting they include M∩P∩C three times.",
      "timeSavingTip": "Formula for exactly two: (A∩B) + (B∩C) + (C∩A) - 3*(A∩B∩C)."
    },
    "hints": [
      "Use the principle of inclusion-exclusion."
    ]
  },
  {
    "id": "d1-s1-q5",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 5,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Basic Gain",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Flipkart",
      "Accenture"
    ],
    "content": {
      "text": "A shopkeeper buys an item for $120 and sells it for $150. What is his profit percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "20%"
      },
      {
        "id": "b",
        "text": "25%"
      },
      {
        "id": "c",
        "text": "30%"
      },
      {
        "id": "d",
        "text": "15%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "CP = 120, SP = 150. Profit = SP - CP = 150 - 120 = 30. Profit% = (Profit / CP) * 100 = (30 / 120) * 100 = 25%.",
      "shortTrick": "Ratio of CP:SP is 120:150 = 4:5. Profit is 1 part on 4 parts, which is 1/4 = 25%.",
      "commonMistake": "Calculating profit percentage on the selling price instead of cost price.",
      "timeSavingTip": "Use ratios CP:SP to find percentage quickly."
    },
    "hints": [
      "Profit percentage is always calculated on the Cost Price (CP)."
    ]
  },
  {
    "id": "d1-s1-q6",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 6,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Dishonest Dealer",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Amazon",
      "JP Morgan"
    ],
    "content": {
      "text": "A dishonest dealer professes to sell his goods at cost price, but uses a false weight of 900 grams for a kilogram. What is his gain percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "10%"
      },
      {
        "id": "b",
        "text": "11.11%"
      },
      {
        "id": "c",
        "text": "12.5%"
      },
      {
        "id": "d",
        "text": "9%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "The dealer claims to sell 1000g at its cost price, but actually gives 900g. Cost for him is for 900g, but he gets money for 1000g. Profit = 100g. Gain% = (Profit / CP) * 100 = (100 / 900) * 100 = 100/9 = 11.11%.",
      "shortTrick": "Gain% = (True Weight - False Weight) / False Weight * 100.",
      "commonMistake": "Calculating gain% as (100/1000)*100 = 10%.",
      "timeSavingTip": "Remember that the base is the false weight he actually gives out."
    },
    "hints": [
      "Think about the cost price of the actual quantity delivered."
    ]
  },
  {
    "id": "d1-s1-q7",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 7,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Markup & Discount Combo",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Adobe",
      "Microsoft"
    ],
    "content": {
      "text": "A trader marks his goods 40% above the cost price and gives a discount of 15% on the marked price. Under a special scheme, he gives 1 item free for every 9 items bought. What is his net profit percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "7.1%"
      },
      {
        "id": "b",
        "text": "8.5%"
      },
      {
        "id": "c",
        "text": "5%"
      },
      {
        "id": "d",
        "text": "10%"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let CP of 1 item = 100. MP = 140. SP after 15% discount = 140 * 0.85 = 119. A customer buys 9 items and gets 1 free (gets 10 items total). Trader's total SP for 10 items = 9 * 119 = 1071. Trader's total CP for 10 items = 10 * 100 = 1000. Profit = 1071 - 1000 = 71. Profit% = (71 / 1000) * 100 = 7.1%.",
      "shortTrick": "Effective SP multiplier = 1.4 * 0.85 * (9/10) = 1.071. Hence 7.1% profit.",
      "commonMistake": "Applying the buy 9 get 1 free as a 1/9 discount instead of 1/10 discount.",
      "timeSavingTip": "Combine all multipliers: CP * (Markup) * (Discount) * (Paid/Given)."
    },
    "hints": [
      "Calculate total CP for all items handed out, and total SP for items paid for."
    ]
  },
  {
    "id": "d1-s1-q8",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 8,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Photograph",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "content": {
      "text": "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?"
    },
    "options": [
      {
        "id": "a",
        "text": "Brother"
      },
      {
        "id": "b",
        "text": "Uncle"
      },
      {
        "id": "c",
        "text": "Cousin"
      },
      {
        "id": "d",
        "text": "Father"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "'My mother' means Suresh's mother. 'The only son of my mother' is Suresh himself (assuming Suresh is male). So, the boy is the son of Suresh. Thus, Suresh is the father of the boy.",
      "shortTrick": "Break it down: 'only son of my mother' = me. 'son of me' = my son. So I am the father.",
      "commonMistake": "Assuming Suresh could be a daughter (if female, she'd be aunt, but Suresh is a male name contextually).",
      "timeSavingTip": "Replace possessive phrases with yourself to visualize."
    },
    "hints": [
      "Break down the sentence from back to front."
    ]
  },
  {
    "id": "d1-s1-q9",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 9,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Coded Relations",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Google",
      "Oracle"
    ],
    "content": {
      "text": "If A + B means A is the brother of B; A - B means A is the sister of B; A * B means A is the father of B. Which of the following means that C is the son of M?"
    },
    "options": [
      {
        "id": "a",
        "text": "M - N * C + F"
      },
      {
        "id": "b",
        "text": "F - C + N * M"
      },
      {
        "id": "c",
        "text": "M * N - C + F"
      },
      {
        "id": "d",
        "text": "M * C + N - F"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "Let's check option d: M * C means M is the father of C. C + N means C is the brother of N. Since C is the brother of N, C is male. M is the father of C and C is male, so C is the son of M. This perfectly matches the requirement.",
      "shortTrick": "C must be male. In M * C + N, the '+' makes C a brother (male). M * C makes M the father. It directly implies C is son of M.",
      "commonMistake": "Choosing an option where C's gender is unknown (e.g., if C is at the very end).",
      "timeSavingTip": "Look for C being followed by a '+' or '*' to establish C as male."
    },
    "hints": [
      "First, eliminate options where C's gender cannot be determined as male."
    ]
  },
  {
    "id": "d1-s1-q10",
    "dayNumber": 1,
    "sprintNumber": 1,
    "questionNumber": 10,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "BFS/DFS properties",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "content": {
      "text": "In an unweighted graph, which traversal algorithm should be used to find the shortest path between two nodes, and what is its time complexity using an adjacency list?"
    },
    "options": [
      {
        "id": "a",
        "text": "DFS, O(V^2)"
      },
      {
        "id": "b",
        "text": "BFS, O(V + E)"
      },
      {
        "id": "c",
        "text": "DFS, O(V + E)"
      },
      {
        "id": "d",
        "text": "BFS, O(E log V)"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "For an unweighted graph, Breadth-First Search (BFS) is optimal for finding the shortest path because it explores all neighbors at distance d before moving to distance d+1. Using an adjacency list, BFS visits every vertex once and explores every edge once, giving a time complexity of O(V + E).",
      "shortTrick": "Shortest path unweighted = BFS. Complexity with adjacency list = O(V + E).",
      "commonMistake": "Thinking Dijkstra's O(E log V) is necessary for unweighted graphs.",
      "timeSavingTip": "Remember: BFS for shortest path in unweighted; DFS for cycle detection or connectivity."
    },
    "hints": [
      "Unweighted graphs don't need priority queues for shortest paths."
    ]
  },
  {
    "id": "d1-s2-q1",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 1,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Population Growth",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "content": {
      "text": "A town's population increases by 10% in the first year and decreases by 10% in the second year. If the present population is 99,000, what was the population two years ago?"
    },
    "options": [
      {
        "id": "a",
        "text": "98,000"
      },
      {
        "id": "b",
        "text": "100,000"
      },
      {
        "id": "c",
        "text": "101,000"
      },
      {
        "id": "d",
        "text": "110,000"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the original population be P. The population after two years = P * (1 + 10/100) * (1 - 10/100) = P * (1.1) * (0.9) = 0.99P. Given 0.99P = 99,000, we get P = 100,000.",
      "shortTrick": "Successive change of +10% and -10% results in a net -1% change. So 99% of original is 99,000. 100% is 100,000.",
      "commonMistake": "Thinking that a 10% increase followed by a 10% decrease results in no change (0%).",
      "timeSavingTip": "Net effect of +x% and -x% is always - (x^2)/100 %."
    },
    "hints": [
      "Use the formula for successive percentage changes."
    ]
  },
  {
    "id": "d1-s2-q2",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 2,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Successive Discounts",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Microsoft",
      "Goldman Sachs"
    ],
    "content": {
      "text": "The marked price of an article is $500. A shopkeeper gives two successive discounts of 20% and 10%. What is the final selling price?"
    },
    "options": [
      {
        "id": "a",
        "text": "$350"
      },
      {
        "id": "b",
        "text": "$360"
      },
      {
        "id": "c",
        "text": "$370"
      },
      {
        "id": "d",
        "text": "$380"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "First discount of 20% on $500: $500 - (0.20 * 500) = $400. Second discount of 10% on the new price ($400): $400 - (0.10 * 400) = $360. Selling price = $360.",
      "shortTrick": "Selling Price = MP * (1 - d1) * (1 - d2) = 500 * 0.8 * 0.9 = 500 * 0.72 = $360.",
      "commonMistake": "Adding the discounts (20% + 10% = 30%) and calculating a single 30% discount on $500.",
      "timeSavingTip": "Convert percentages to multipliers (0.8 and 0.9) and multiply them together first (0.72)."
    },
    "hints": [
      "Calculate the discount step by step, applying the second discount on the reduced price."
    ]
  },
  {
    "id": "d1-s2-q3",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 3,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Dry and Fresh Fruits",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Amazon",
      "Oracle"
    ],
    "content": {
      "text": "Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 100 kg of fresh fruits?"
    },
    "options": [
      {
        "id": "a",
        "text": "32 kg"
      },
      {
        "id": "b",
        "text": "40 kg"
      },
      {
        "id": "c",
        "text": "52 kg"
      },
      {
        "id": "d",
        "text": "80 kg"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "The quantity of pulp remains constant. In fresh fruit, pulp percentage = 100% - 68% = 32%. Quantity of pulp in 100 kg fresh fruit = 32% of 100 = 32 kg. In dry fruit, water is 20%, so pulp is 80%. Let the weight of dry fruit be x kg. Then 80% of x = 32. 0.8x = 32 => x = 40 kg.",
      "shortTrick": "Equate the constant part (pulp): 32% of 100 = 80% of x. Therefore, x = (32 * 100) / 80 = 40.",
      "commonMistake": "Trying to balance the water content instead of the solid pulp content.",
      "timeSavingTip": "Always focus on the non-changing component (pulp) in evaporation or drying problems."
    },
    "hints": [
      "The amount of water changes, but the amount of solid fruit pulp remains exactly the same."
    ]
  },
  {
    "id": "d1-s2-q4",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 4,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Item Quantities",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "JP Morgan",
      "Flipkart"
    ],
    "content": {
      "text": "If the cost price of 12 pens is equal to the selling price of 8 pens, what is the profit percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "33.33%"
      },
      {
        "id": "b",
        "text": "40%"
      },
      {
        "id": "c",
        "text": "50%"
      },
      {
        "id": "d",
        "text": "60%"
      }
    ],
    "correctAnswer": "c",
    "explanation": {
      "detailed": "Let the Cost Price (CP) of 1 pen be $1. Then CP of 8 pens = $8. Selling Price (SP) of 8 pens = CP of 12 pens = $12. Profit = SP - CP = $12 - $8 = $4. Profit % = (Profit / CP) * 100 = (4 / 8) * 100 = 50%.",
      "shortTrick": "Profit % = ((Items Bought - Items Sold) / Items Sold) * 100 = ((12 - 8) / 8) * 100 = 50%.",
      "commonMistake": "Using the number of items bought (12) as the base instead of the items sold (8) for the profit percentage calculation.",
      "timeSavingTip": "Formula: (CP_qty - SP_qty) / SP_qty * 100. If positive, it's profit; if negative, loss."
    },
    "hints": [
      "Assume a convenient number for the cost price of a single item."
    ]
  },
  {
    "id": "d1-s2-q5",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 5,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Dishonest Dealer",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Walmart",
      "Adobe"
    ],
    "content": {
      "text": "A dishonest dealer professes to sell his goods at cost price, but he uses a weight of 900 grams for a 1 kg weight. Find his gain percent."
    },
    "options": [
      {
        "id": "a",
        "text": "10%"
      },
      {
        "id": "b",
        "text": "11.11%"
      },
      {
        "id": "c",
        "text": "12.5%"
      },
      {
        "id": "d",
        "text": "9%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the price of 1 gram be $1. The dealer claims to sell 1000g for $1000. However, he only gives 900g. His actual cost for the 900g is $900. Profit = $1000 - $900 = $100. Profit % = (Profit / Actual Cost) * 100 = (100 / 900) * 100 = 11.11%.",
      "shortTrick": "Gain % = (Error / (True Value - Error)) * 100 = (100 / 900) * 100 = 11.11%.",
      "commonMistake": "Calculating profit over the claimed weight (1000g) resulting in 10% gain.",
      "timeSavingTip": "True weight / False weight ratio directly gives the multiplier. 1000/900 = 10/9. Profit is 1/9 = 11.11%."
    },
    "hints": [
      "The cost price should be calculated based on the actual amount of goods given to the customer, not what is claimed."
    ]
  },
  {
    "id": "d1-s2-q6",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 6,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Markup and Discount",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Google",
      "Microsoft"
    ],
    "content": {
      "text": "A tradesman marks his goods at 25% above the cost price and allows purchasers a discount of 12.5%. What is his overall profit percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "8.5%"
      },
      {
        "id": "b",
        "text": "9.375%"
      },
      {
        "id": "c",
        "text": "10%"
      },
      {
        "id": "d",
        "text": "12.5%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let Cost Price (CP) = 100. Marked Price (MP) = 100 + 25% of 100 = 125. Discount = 12.5% of MP = 0.125 * 125 = 15.625. Selling Price (SP) = MP - Discount = 125 - 15.625 = 109.375. Profit = SP - CP = 109.375 - 100 = 9.375. Profit % = 9.375%.",
      "shortTrick": "Use net change formula: a + b + (a*b)/100. Here a = +25, b = -12.5. Net = 25 - 12.5 - (25*12.5)/100 = 12.5 - 3.125 = 9.375%.",
      "commonMistake": "Simply subtracting the discount from the markup (25 - 12.5 = 12.5) without applying successive percentage logic.",
      "timeSavingTip": "Using fractions: Markup is 1/4 (MP = 5/4 CP). Discount is 1/8 (SP = 7/8 MP). SP = (7/8)*(5/4)*CP = 35/32 CP. Profit is 3/32 = 9.375%."
    },
    "hints": [
      "Successive percentage changes apply here since the discount is on the marked price."
    ]
  },
  {
    "id": "d1-s2-q7",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 7,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Pointing to Photograph",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "TCS"
    ],
    "content": {
      "text": "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?"
    },
    "options": [
      {
        "id": "a",
        "text": "His own"
      },
      {
        "id": "b",
        "text": "His son's"
      },
      {
        "id": "c",
        "text": "His father's"
      },
      {
        "id": "d",
        "text": "His nephew's"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Since the speaker has no brother or sister, 'my father's son' can only be the speaker himself. The statement can be rewritten as 'that man's father is myself'. Therefore, the man in the photograph is the speaker's son.",
      "shortTrick": "Replace 'my father's son' with 'me' (since he has no siblings). The sentence becomes: 'that man's father is me'. So the man is his son.",
      "commonMistake": "Concluding the photograph is of the man himself due to confusion over the wordings.",
      "timeSavingTip": "Work backwards from the end of the sentence to simplify."
    },
    "hints": [
      "Break the sentence down. Who is 'my father's son' if the man has no siblings?"
    ]
  },
  {
    "id": "d1-s2-q8",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 8,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Coded Relations",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Goldman Sachs",
      "Oracle"
    ],
    "content": {
      "text": "A+B means A is the brother of B; A-B means A is the sister of B; and A x B means A is the father of B. Which of the following means that C is the son of M?"
    },
    "options": [
      {
        "id": "a",
        "text": "M-N x C+F"
      },
      {
        "id": "b",
        "text": "F-C+N x M"
      },
      {
        "id": "c",
        "text": "N+M-F x C"
      },
      {
        "id": "d",
        "text": "M x N-C+F"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "Check option (d) 'M x N-C+F': M x N implies M is the father of N. N-C implies N is the sister of C. C+F implies C is the brother of F. Since M is the father of N and N is the sister of C, M is the father of C. C is the brother of F, which makes C male. Thus, C is the son of M.",
      "shortTrick": "For C to be a son, C must be male. Looking at the options, C+F (C is brother) guarantees C is male. Options (a) and (d) have C+F. Check (d): M is father of N, who is sister to C. So M is father of C.",
      "commonMistake": "Forgetting to check the gender of C. If C were female, C would be the daughter, not the son.",
      "timeSavingTip": "First, eliminate options where C's gender is unknown or female."
    },
    "hints": [
      "C must be male. Look for the symbol after C that establishes male gender."
    ]
  },
  {
    "id": "d1-s2-q9",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 9,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "BFS Output",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Google",
      "Amazon"
    ],
    "content": {
      "text": "In a breadth-first search (BFS) on an unweighted, connected graph G, starting from a source vertex S, what does the shortest path tree produced by BFS represent?"
    },
    "options": [
      {
        "id": "a",
        "text": "The minimum spanning tree of G"
      },
      {
        "id": "b",
        "text": "The shortest path from S to all other vertices"
      },
      {
        "id": "c",
        "text": "A topological sort of G"
      },
      {
        "id": "d",
        "text": "The longest path from S"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Breadth-First Search (BFS) explores the graph level by level. It visits all direct neighbors of S first (distance 1), then their neighbors (distance 2), and so on. Because edges are unweighted, the first time BFS reaches a vertex, it has found the path with the fewest number of edges, which is the shortest path.",
      "shortTrick": "Unweighted shortest paths = BFS. Weighted shortest paths = Dijkstra's.",
      "commonMistake": "Confusing BFS shortest path tree with Minimum Spanning Tree (MST). BFS does not guarantee MST in a weighted graph.",
      "timeSavingTip": "Keywords 'BFS' and 'unweighted' immediately point to shortest path."
    },
    "hints": [
      "BFS explores vertices layer by layer based on the number of edges from the source."
    ]
  },
  {
    "id": "d1-s2-q10",
    "dayNumber": 1,
    "sprintNumber": 2,
    "questionNumber": 10,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "Cycle Detection",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Microsoft",
      "Flipkart"
    ],
    "content": {
      "text": "During a Depth First Search (DFS) on a directed graph, the discovery of a 'back edge' definitively indicates the presence of:"
    },
    "options": [
      {
        "id": "a",
        "text": "An articulation point"
      },
      {
        "id": "b",
        "text": "A cycle in the graph"
      },
      {
        "id": "c",
        "text": "A strongly connected component"
      },
      {
        "id": "d",
        "text": "A topological sort error"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "In a DFS traversal, a back edge is an edge that connects a vertex to one of its ancestors in the DFS tree. Finding a back edge means there is a path from the ancestor to the descendant and an edge from the descendant back to the ancestor, forming a cycle.",
      "shortTrick": "Back edge = Cycle. It's the standard cycle detection property of DFS.",
      "commonMistake": "Assuming cross edges or forward edges also indicate cycles.",
      "timeSavingTip": "Memorize graph edge types in DFS: Tree edge, Back edge, Forward edge, Cross edge. Only back edges indicate cycles in directed graphs."
    },
    "hints": [
      "Think about what happens when you revisit a node that is currently in the recursion stack."
    ]
  },
  {
    "id": "d1-s3-q1",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 1,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Successive Discounts",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "TCS"
    ],
    "content": {
      "text": "A shopkeeper offers two successive discounts of 10% and 20% on an item. What is the single equivalent discount percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "30%"
      },
      {
        "id": "b",
        "text": "28%"
      },
      {
        "id": "c",
        "text": "32%"
      },
      {
        "id": "d",
        "text": "25%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the original price be 100.\nFirst discount = 10% of 100 = 10. Price becomes 90.\nSecond discount = 20% of 90 = 18. Price becomes 90 - 18 = 72.\nTotal discount = 100 - 72 = 28.\nEquivalent discount = (28/100) * 100% = 28%.",
      "shortTrick": "Use the formula for successive discounts a% and b%: a + b - (ab/100). Here, 10 + 20 - (10*20/100) = 30 - 2 = 28%.",
      "commonMistake": "Simply adding the percentages (10 + 20 = 30%).",
      "timeSavingTip": "Always use a + b - ab/100 for two successive discounts."
    },
    "hints": [
      "Consider starting with a base value of 100."
    ]
  },
  {
    "id": "d1-s3-q2",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 2,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Population Growth",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Goldman Sachs",
      "Cognizant"
    ],
    "content": {
      "text": "The population of a town increases by 5% annually. If its present population is 88,200, what was its population 2 years ago?"
    },
    "options": [
      {
        "id": "a",
        "text": "80,000"
      },
      {
        "id": "b",
        "text": "82,000"
      },
      {
        "id": "c",
        "text": "84,000"
      },
      {
        "id": "d",
        "text": "85,000"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let the population 2 years ago be P.\nPopulation after 2 years = P * (1 + R/100)^2\n88,200 = P * (1 + 5/100)^2\n88,200 = P * (1.05)^2\n88,200 = P * 1.1025\nP = 88,200 / 1.1025 = 80,000.",
      "shortTrick": "5% = 1/20. So multiplier is 21/20. P * (21/20) * (21/20) = 88200. P = 88200 * 400 / 441 = 200 * 400 = 80000.",
      "commonMistake": "Decreasing 88,200 by 10% to find the past population.",
      "timeSavingTip": "Convert 5% to the fraction 1/20 to make calculations easier."
    },
    "hints": [
      "Think in terms of fractional multipliers instead of decimals."
    ]
  },
  {
    "id": "d1-s3-q3",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 3,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Complex Scenario",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "JP Morgan",
      "Microsoft"
    ],
    "content": {
      "text": "In an election between two candidates, 10% of voters did not cast their votes. 10% of the votes cast were found invalid. The winning candidate got 54% of the valid votes and won by a majority of 1620 votes. Find the total number of voters enrolled in the voter list."
    },
    "options": [
      {
        "id": "a",
        "text": "20000"
      },
      {
        "id": "b",
        "text": "25000"
      },
      {
        "id": "c",
        "text": "22500"
      },
      {
        "id": "d",
        "text": "30000"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let total voters be x.\nVotes cast = 90% of x = 0.9x\nValid votes = 90% of (0.9x) = 0.81x\nWinner got 54% of valid votes, so loser got 46% of valid votes.\nDifference = 54% - 46% = 8% of valid votes.\n8% of 0.81x = 1620\n(8/100) * 0.81x = 1620\n0.0648x = 1620\nx = 1620 / 0.0648 = 25000.",
      "shortTrick": "Let total = 1000 units. Cast = 900. Valid = 810. Winner = 54%, Loser = 46%. Margin = 8% of 810 = 64.8 units. 64.8 units = 1620 -> 1 unit = 25. Total = 1000 * 25 = 25000.",
      "commonMistake": "Calculating 54% of total votes instead of valid votes.",
      "timeSavingTip": "Work backwards or use the 100x method to avoid decimals."
    },
    "hints": [
      "Start by assuming the total number of voters is 100 or 1000x."
    ]
  },
  {
    "id": "d1-s3-q4",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 4,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Markup and Discount",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Flipkart",
      "Accenture"
    ],
    "content": {
      "text": "A trader marks his goods 20% above the cost price and then allows a discount of 10%. What is his net profit percentage?"
    },
    "options": [
      {
        "id": "a",
        "text": "8%"
      },
      {
        "id": "b",
        "text": "10%"
      },
      {
        "id": "c",
        "text": "12%"
      },
      {
        "id": "d",
        "text": "18%"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let Cost Price (CP) = 100.\nMarked Price (MP) = CP + 20% of CP = 120.\nDiscount = 10% of MP = 10% of 120 = 12.\nSelling Price (SP) = MP - Discount = 120 - 12 = 108.\nProfit = SP - CP = 108 - 100 = 8.\nProfit Percentage = (8/100) * 100% = 8%.",
      "shortTrick": "Net effect formula: a + b + ab/100. Markup = +20, Discount = -10. Net = 20 - 10 + (20 * -10)/100 = 10 - 2 = +8%.",
      "commonMistake": "Subtracting 10% discount from the cost price rather than marked price.",
      "timeSavingTip": "Use the net percentage change formula."
    },
    "hints": [
      "Assume the cost price is 100 to simplify the process."
    ]
  },
  {
    "id": "d1-s3-q5",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 5,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Dishonest Dealer",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Oracle",
      "Walmart"
    ],
    "content": {
      "text": "A dishonest dealer professes to sell his goods at cost price, but he uses a false weight of 900 grams for a kilogram. Find his gain percentage."
    },
    "options": [
      {
        "id": "a",
        "text": "10%"
      },
      {
        "id": "b",
        "text": "11.11%"
      },
      {
        "id": "c",
        "text": "9%"
      },
      {
        "id": "d",
        "text": "12.5%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the cost price of 1g be Rs. 1.\nHe charges for 1000g, so Selling Price (SP) = Rs. 1000.\nBut he actually gives 900g, so his actual Cost Price (CP) = Rs. 900.\nGain = SP - CP = 1000 - 900 = 100.\nGain Percentage = (Gain / True CP) * 100 = (100 / 900) * 100 = 100/9 % = 11.11%.",
      "shortTrick": "Gain % = (Error / (True Value - Error)) * 100. Error = 100g. (100 / 900) * 100 = 11.11%.",
      "commonMistake": "Calculating gain percentage on the false weight instead of the true cost price.",
      "timeSavingTip": "Always base the gain percentage on what actually goes out of the dealer's pocket."
    },
    "hints": [
      "The cost price should be based on the actual amount of goods given."
    ]
  },
  {
    "id": "d1-s3-q6",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 6,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Pointing Puzzle",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Infosys",
      "Wipro"
    ],
    "content": {
      "text": "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?"
    },
    "options": [
      {
        "id": "a",
        "text": "Brother"
      },
      {
        "id": "b",
        "text": "Uncle"
      },
      {
        "id": "c",
        "text": "Cousin"
      },
      {
        "id": "d",
        "text": "Father"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "Let's break down the statement: 'the only son of my mother'.\nSuresh's mother's only son is Suresh himself.\nSo, the statement becomes 'He is the son of Suresh'.\nTherefore, Suresh is the father of that boy.",
      "shortTrick": "Replace 'only son of my mother' with 'myself' directly.",
      "commonMistake": "Assuming Suresh has a brother (the uncle). The word 'only' is key.",
      "timeSavingTip": "Work backwards from 'my' to understand the relation step by step."
    },
    "hints": [
      "Who is the 'only son of my mother'?"
    ]
  },
  {
    "id": "d1-s3-q7",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 7,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Coded Relations",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Adobe",
      "Google"
    ],
    "content": {
      "text": "If A + B means A is the brother of B; A - B means A is the sister of B and A * B means A is the father of B. Which of the following means that C is the son of M?"
    },
    "options": [
      {
        "id": "a",
        "text": "M - N * C + F"
      },
      {
        "id": "b",
        "text": "F - C + N * M"
      },
      {
        "id": "c",
        "text": "M * N - C + F"
      },
      {
        "id": "d",
        "text": "M * C + N - F"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "Let's check option d: M * C + N - F.\nM * C means M is the father of C.\nC + N means C is the brother of N.\nSince C is a brother, C is male. M is the father of C. Thus, C is the son of M.\nThis matches the requirement perfectly.",
      "shortTrick": "Look for options where C's gender is confirmed male (C followed by + or *). Option C has C+F, option D has C+N. Then check parentage.",
      "commonMistake": "Selecting an option where C's gender is unknown or female.",
      "timeSavingTip": "Quickly eliminate options by checking the gender of the target person."
    },
    "hints": [
      "First determine the gender C must be (male), then find equations that satisfy this."
    ]
  },
  {
    "id": "d1-s3-q8",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 8,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Family Tree",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Amazon",
      "Goldman Sachs"
    ],
    "content": {
      "text": "A family consists of six members P, Q, R, X, Y and Z. Q is the son of R but R is not mother of Q. P and R are a married couple. Y is the brother of R. X is the daughter of P. Z is brother of P. How many female members are there in the family?"
    },
    "options": [
      {
        "id": "a",
        "text": "1"
      },
      {
        "id": "b",
        "text": "2"
      },
      {
        "id": "c",
        "text": "3"
      },
      {
        "id": "d",
        "text": "4"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "1. Q is son of R. R is not mother, so R is father (Male).\n2. P and R are married. Since R is male, P is his wife (Female).\n3. Y is brother of R (Male).\n4. X is daughter of P (Female).\n5. Z is brother of P (Male).\nMembers and genders: R(M), P(F), Q(M), Y(M), X(F), Z(M).\nFemales are P and X. Total = 2.",
      "shortTrick": "Track genders with +/- signs as you read. R+, P-, Y+, X-, Z+. Total minuses = 2.",
      "commonMistake": "Forgetting that in a married couple, if one is not a mother (but has a child), they must be the father.",
      "timeSavingTip": "Draw a small family tree diagram mapping relationships and genders simultaneously."
    },
    "hints": [
      "If R has a son but isn't a mother, what is R's gender?"
    ]
  },
  {
    "id": "d1-s3-q9",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 9,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "BFS vs DFS",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Microsoft",
      "Google"
    ],
    "content": {
      "text": "Which data structure is typically used to implement Breadth-First Search (BFS) and Depth-First Search (DFS) on a graph, respectively?"
    },
    "options": [
      {
        "id": "a",
        "text": "Stack for BFS, Queue for DFS"
      },
      {
        "id": "b",
        "text": "Queue for BFS, Stack for DFS"
      },
      {
        "id": "c",
        "text": "Priority Queue for both"
      },
      {
        "id": "d",
        "text": "Queue for both"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Breadth-First Search (BFS) explores the graph layer by layer, which requires a First-In-First-Out (FIFO) ordering. This is naturally implemented using a Queue.\nDepth-First Search (DFS) explores as deep as possible along each branch before backtracking, requiring a Last-In-First-Out (LIFO) ordering. This is naturally implemented using a Stack (or the call stack via recursion).",
      "shortTrick": "BFS = Broad = Queue (line). DFS = Deep = Stack (pile).",
      "commonMistake": "Confusing the two and assuming DFS uses a Queue.",
      "timeSavingTip": "Remember the acronym 'BS' (BFS -> Stack) is wrong, so BFS is Queue."
    },
    "hints": [
      "Think about how you explore layers vs plunging deep into a path."
    ]
  },
  {
    "id": "d1-s3-q10",
    "dayNumber": 1,
    "sprintNumber": 3,
    "questionNumber": 10,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "Cycle Detection",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Amazon",
      "Oracle"
    ],
    "content": {
      "text": "In a Depth-First Search (DFS) of a directed graph, the presence of a cycle is indicated by a specific type of edge encountered during traversal. Which type of edge is it?"
    },
    "options": [
      {
        "id": "a",
        "text": "Tree edge"
      },
      {
        "id": "b",
        "text": "Forward edge"
      },
      {
        "id": "c",
        "text": "Cross edge"
      },
      {
        "id": "d",
        "text": "Back edge"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "During a DFS traversal of a directed graph, edges can be classified into Tree edges, Back edges, Forward edges, and Cross edges.\nA cycle exists in a directed graph if and only if the DFS reveals a 'Back edge'. A back edge is an edge that connects a vertex to one of its ancestors in the DFS tree.",
      "shortTrick": "Back edge = points back up to an ancestor = forms a loop (cycle).",
      "commonMistake": "Thinking cross edges form cycles. Cross edges connect non-ancestral/descendant nodes.",
      "timeSavingTip": "Keep track of 'visited' vs 'currently in recursion stack'. Hitting a node currently in the stack means a back edge was found."
    },
    "hints": [
      "Which edge points back to a node currently being explored?"
    ]
  },
  {
    "id": "d1-s4-q1",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 1,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Population Growth",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "TCS"
    ],
    "content": {
      "text": "The population of a town increases by 10% annually. If the present population is 10,000, what will be the population after 2 years?"
    },
    "options": [
      {
        "id": "a",
        "text": "12,000"
      },
      {
        "id": "b",
        "text": "12,100"
      },
      {
        "id": "c",
        "text": "11,000"
      },
      {
        "id": "d",
        "text": "12,210"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Present population (P) = 10,000. Rate of increase (R) = 10%. Time (n) = 2 years. Population after 2 years = P * (1 + R/100)^n = 10000 * (1 + 10/100)^2 = 10000 * (11/10)^2 = 10000 * 121/100 = 12,100.",
      "shortTrick": "Using successive percentage change: 10% + 10% + (10*10)/100% = 21% total increase. 121% of 10000 is 12100.",
      "commonMistake": "Simply adding 10% twice to the base value: 10000 + 1000 + 1000 = 12000, which ignores the compounding effect.",
      "timeSavingTip": "Recognize the multipliers. 10% increase means multiplying by 1.1. So 10000 * 1.1 * 1.1 = 12100."
    },
    "hints": [
      "Remember that the 10% increase in the second year applies to the new population after the first year."
    ]
  },
  {
    "id": "d1-s4-q2",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 2,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Passing Marks",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Infosys",
      "Wipro"
    ],
    "content": {
      "text": "A student has to secure 40% marks to pass. He gets 178 marks and fails by 22 marks. What are the maximum marks?"
    },
    "options": [
      {
        "id": "a",
        "text": "400"
      },
      {
        "id": "b",
        "text": "500"
      },
      {
        "id": "c",
        "text": "600"
      },
      {
        "id": "d",
        "text": "800"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Passing marks = Marks obtained + Marks failed by = 178 + 22 = 200. We are given that the passing marks are 40% of the maximum marks. Let maximum marks be x. Then 40% of x = 200 => (40/100) * x = 200 => x = (200 * 100) / 40 = 500.",
      "shortTrick": "If 40% is 200, then 10% is 50. Therefore, 100% is 500.",
      "commonMistake": "Calculating 40% of 178 or setting 178 as 40%.",
      "timeSavingTip": "Mental math: 40% -> 2/5. (2/5)x = 200 => x = 500."
    },
    "hints": [
      "First, calculate the total marks required to pass."
    ]
  },
  {
    "id": "d1-s4-q3",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 3,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Dishonest Dealer",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Google",
      "Flipkart"
    ],
    "content": {
      "text": "A dishonest dealer professes to sell his goods at cost price, but he uses a weight of 900 grams for the 1 kg weight. Find his gain percent."
    },
    "options": [
      {
        "id": "a",
        "text": "10%"
      },
      {
        "id": "b",
        "text": "11.11%"
      },
      {
        "id": "c",
        "text": "9%"
      },
      {
        "id": "d",
        "text": "12.5%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the cost price of 1 gram be $1. Cost price of 900g = $900. Selling price for what he claims is 1 kg (1000g) = $1000. Profit = SP - CP = 1000 - 900 = 100. Gain % = (Profit / CP) * 100 = (100 / 900) * 100 = 100/9 = 11.11%.",
      "shortTrick": "Gain % = (True Weight - False Weight) / False Weight * 100. Here, (1000 - 900) / 900 * 100 = 11.11%.",
      "commonMistake": "Calculating the profit percentage on the claimed weight (1000g) which gives 10%.",
      "timeSavingTip": "Remember the formula: Error / (True Value - Error) * 100%. 100 / 900 = 1/9 = 11.11%."
    },
    "hints": [
      "Think about what he actually parts with versus what he gets paid for."
    ]
  },
  {
    "id": "d1-s4-q4",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 4,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "CP equals SP",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Microsoft",
      "Oracle"
    ],
    "content": {
      "text": "If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit percentage."
    },
    "options": [
      {
        "id": "a",
        "text": "20%"
      },
      {
        "id": "b",
        "text": "25%"
      },
      {
        "id": "c",
        "text": "30%"
      },
      {
        "id": "d",
        "text": "33.33%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let CP of 1 article = $1. CP of 15 articles = $15. SP of 12 articles = CP of 15 articles = $15. SP of 1 article = 15/12 = $1.25. Profit on 1 article = SP - CP = 1.25 - 1 = $0.25. Profit % = (0.25 / 1) * 100 = 25%.",
      "shortTrick": "Profit % = (CP quantity - SP quantity) / SP quantity * 100 = (15 - 12) / 12 * 100 = 3/12 * 100 = 25%.",
      "commonMistake": "Calculating profit over the CP quantity (15) instead of the SP quantity (12) which results in 20%.",
      "timeSavingTip": "Just memorize: (QCP - QSP)/QSP * 100."
    },
    "hints": [
      "Assume the cost price of a single article is $1."
    ]
  },
  {
    "id": "d1-s4-q5",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 5,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Markup and Discount",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Goldman Sachs",
      "JP Morgan"
    ],
    "content": {
      "text": "A merchant marks his goods up by 50% above the cost price and then offers a discount on the marked price. If he makes a net profit of 20%, what is the discount percentage offered?"
    },
    "options": [
      {
        "id": "a",
        "text": "15%"
      },
      {
        "id": "b",
        "text": "20%"
      },
      {
        "id": "c",
        "text": "25%"
      },
      {
        "id": "d",
        "text": "30%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the Cost Price (CP) be $100. The Marked Price (MP) is 50% above CP = $150. Since the net profit is 20%, the Selling Price (SP) = $120. Discount = MP - SP = 150 - 120 = $30. Discount % = (Discount / MP) * 100 = (30 / 150) * 100 = 20%.",
      "shortTrick": "Using successive changes formula: Markup% - Discount% - (Markup% * Discount%)/100 = Profit%. 50 - d - (50*d)/100 = 20 => 50 - 1.5d = 20 => 1.5d = 30 => d = 20%.",
      "commonMistake": "Taking discount on the CP instead of the MP.",
      "timeSavingTip": "Base 100 method is the fastest. 100 -> 150 -> 120. Decrease from 150 to 120 is 30. 30/150 = 1/5 = 20%."
    },
    "hints": [
      "Assume the cost price is 100 to simplify the calculations."
    ]
  },
  {
    "id": "d1-s4-q6",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 6,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Pointing to Photograph",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Cognizant",
      "Accenture"
    ],
    "content": {
      "text": "Pointing to a photograph of a boy, Suresh said, \"He is the son of the only son of my mother.\" How is Suresh related to that boy?"
    },
    "options": [
      {
        "id": "a",
        "text": "Brother"
      },
      {
        "id": "b",
        "text": "Uncle"
      },
      {
        "id": "c",
        "text": "Cousin"
      },
      {
        "id": "d",
        "text": "Father"
      }
    ],
    "correctAnswer": "d",
    "explanation": {
      "detailed": "Break down the statement starting from the end: \"my mother\" refers to Suresh's mother. \"the only son of my mother\" means Suresh himself (since he is male). So, the boy is the \"son of Suresh\". Therefore, Suresh is the father of the boy.",
      "shortTrick": "Only son of Suresh's mother = Suresh. Boy is the son of Suresh. Suresh is the father.",
      "commonMistake": "Misidentifying \"the only son of my mother\" as Suresh's brother, leading to the answer \"Uncle\".",
      "timeSavingTip": "Read backwards from 'my': my mother's only son -> me. Son of me -> my son. I am the father."
    },
    "hints": [
      "Work backwards from 'my mother'."
    ]
  },
  {
    "id": "d1-s4-q7",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 7,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Coded Relations",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Walmart",
      "Adobe"
    ],
    "content": {
      "text": "A + B means A is the father of B; A - B means A is the brother of B; A % B means A is the wife of B; A x B means A is the mother of B. In the expression 'P + Q x R - S', how is P related to S?"
    },
    "options": [
      {
        "id": "a",
        "text": "Grandfather"
      },
      {
        "id": "b",
        "text": "Grandmother"
      },
      {
        "id": "c",
        "text": "Father"
      },
      {
        "id": "d",
        "text": "Uncle"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let's decode the expression 'P + Q x R - S' step by step: 1. P + Q: P is the father of Q. 2. Q x R: Q is the mother of R. 3. R - S: R is the brother of S. From this, R and S are siblings, and Q is their mother. Since P is the father of Q, P is the father of their mother. Therefore, P is the maternal grandfather of S.",
      "shortTrick": "Draw a family tree on paper quickly: P(m) -> Q(f) -> R(m) & S. P is two generations above S, male -> Grandfather.",
      "commonMistake": "Getting confused with maternal vs paternal or misreading 'A x B' as something else.",
      "timeSavingTip": "Only track generations. P to Q is -1 generation, Q to R is -1 generation, R to S is 0 generation. P is +2 generations from S and male (due to '+'). Hence, Grandfather."
    },
    "hints": [
      "Draw a family tree based on the expression."
    ]
  },
  {
    "id": "d1-s4-q8",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 8,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "BFS",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "content": {
      "text": "In which data structure is a Breadth-First Search (BFS) typically implemented?"
    },
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Priority Queue"
      },
      {
        "id": "d",
        "text": "Linked List"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Breadth-First Search (BFS) explores all the neighbors of a node before moving to the next level. To keep track of the nodes to visit next in a First-In-First-Out (FIFO) manner, a Queue is used.",
      "shortTrick": "BFS uses Queue (FIFO), DFS uses Stack (LIFO).",
      "commonMistake": "Confusing BFS with DFS which uses a Stack.",
      "timeSavingTip": "Just memorize: B-Q (BFS Queue) and D-S (DFS Stack)."
    },
    "hints": [
      "BFS explores nodes level by level."
    ]
  },
  {
    "id": "d1-s4-q9",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 9,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "DFS Properties",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Google",
      "Adobe"
    ],
    "content": {
      "text": "Which of the following is true about Depth First Search (DFS) on an unweighted graph?"
    },
    "options": [
      {
        "id": "a",
        "text": "It guarantees finding the shortest path."
      },
      {
        "id": "b",
        "text": "It uses a queue."
      },
      {
        "id": "c",
        "text": "It can be implemented using recursion."
      },
      {
        "id": "d",
        "text": "It explores all neighbors before moving deeper."
      }
    ],
    "correctAnswer": "c",
    "explanation": {
      "detailed": "DFS explores as far as possible along each branch before backtracking. It uses a Stack implicitly via the function call stack when implemented recursively. It does not guarantee the shortest path (BFS does). Exploring all neighbors before moving deeper describes BFS, not DFS.",
      "shortTrick": "DFS is naturally recursive because it goes deep until it can't, then returns (backtracks).",
      "commonMistake": "Assuming DFS finds the shortest path. Only BFS does on unweighted graphs.",
      "timeSavingTip": "Recursion uses the call stack, perfectly matching DFS's LIFO requirement."
    },
    "hints": [
      "Think about how the function call stack operates."
    ]
  },
  {
    "id": "d1-s4-q10",
    "dayNumber": 1,
    "sprintNumber": 4,
    "questionNumber": 10,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "Time Complexity",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Goldman Sachs",
      "Amazon"
    ],
    "content": {
      "text": "What is the time complexity of Depth First Search (DFS) on a graph with V vertices and E edges represented using an adjacency list?"
    },
    "options": [
      {
        "id": "a",
        "text": "O(V)"
      },
      {
        "id": "b",
        "text": "O(E)"
      },
      {
        "id": "c",
        "text": "O(V + E)"
      },
      {
        "id": "d",
        "text": "O(V * E)"
      }
    ],
    "correctAnswer": "c",
    "explanation": {
      "detailed": "In a DFS traversal using an adjacency list, every vertex is visited exactly once, which takes O(V) time. For each vertex, we iterate through its outgoing edges. The sum of all iterations is proportional to the total number of edges, which is O(E). Therefore, the overall time complexity is O(V + E).",
      "shortTrick": "Adjacency list always visits every vertex and every edge once, so V+E.",
      "commonMistake": "Confusing it with an adjacency matrix which takes O(V^2) time.",
      "timeSavingTip": "Adjacency List -> O(V+E). Adjacency Matrix -> O(V^2)."
    },
    "hints": [
      "Consider how many times each vertex and each edge is processed."
    ]
  },
  {
    "id": "d1-s5-q1",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 1,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Basic Percentage Calculation",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "TCS"
    ],
    "content": {
      "text": "If 40% of a number is equal to two-thirds of another number, what is the ratio of the first number to the second number?"
    },
    "options": [
      {
        "id": "a",
        "text": "2 : 5"
      },
      {
        "id": "b",
        "text": "3 : 7"
      },
      {
        "id": "c",
        "text": "5 : 3"
      },
      {
        "id": "d",
        "text": "7 : 3"
      }
    ],
    "correctAnswer": "c",
    "explanation": {
      "detailed": "Let the numbers be x and y.\n40% of x = (2/3) of y\n(40/100) * x = (2/3) * y\n(2/5) * x = (2/3) * y\nx/y = (2/3) * (5/2) = 5/3\nTherefore, the ratio is 5:3.",
      "shortTrick": "Equate the fractions: 2/5 x = 2/3 y -> x/y = 5/3.",
      "commonMistake": "Finding the ratio y/x instead of x/y.",
      "timeSavingTip": "Cancel out numerators directly: 2/5 and 2/3 -> cross multiply denominators to get 5/3."
    },
    "hints": [
      "Write percentages as fractions."
    ]
  },
  {
    "id": "d1-s5-q2",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 2,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Successive Percentage Change",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Goldman Sachs",
      "Flipkart"
    ],
    "content": {
      "text": "A number is mistakenly divided by 5 instead of being multiplied by 5. Find the percentage change in the result due to this mistake."
    },
    "options": [
      {
        "id": "a",
        "text": "96%"
      },
      {
        "id": "b",
        "text": "80%"
      },
      {
        "id": "c",
        "text": "2400%"
      },
      {
        "id": "d",
        "text": "400%"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let the original number be x.\nThe intended correct result = 5x.\nThe incorrect result obtained = x / 5 = 0.2x.\nThe error = 5x - 0.2x = 4.8x.\nPercentage error = (Error / Correct Result) * 100\n= (4.8x / 5x) * 100 = 4.8 * 20 = 96%.",
      "shortTrick": "Use 100 as base. Expected: 500, Actual: 20. Change: 480. 480/500 = 96%.",
      "commonMistake": "Calculating percentage error with respect to the incorrect value.",
      "timeSavingTip": "Assume a convenient number like 5. 5*5=25 (correct), 5/5=1 (incorrect). Diff=24. 24/25 = 96%."
    },
    "hints": [
      "Assume the number is a multiple of 5."
    ]
  },
  {
    "id": "d1-s5-q3",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 3,
    "type": "mcq",
    "category": "quant",
    "topic": "Percentages",
    "subtopic": "Voting & Elections",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Google",
      "Microsoft"
    ],
    "content": {
      "text": "In an election between two candidates, 10% of voters did not cast their vote, and 10% of the polled votes were found invalid. The winning candidate got 54% of the valid votes and won by a majority of 1620 votes. Find the total number of voters enrolled in the voters' list."
    },
    "options": [
      {
        "id": "a",
        "text": "20000"
      },
      {
        "id": "b",
        "text": "25000"
      },
      {
        "id": "c",
        "text": "22000"
      },
      {
        "id": "d",
        "text": "28000"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let total voters = 100x.\nVotes cast = 90x.\nValid votes = 90% of 90x = 81x.\nWinner gets 54% of valid votes. Loser gets (100% - 54%) = 46% of valid votes.\nMargin of victory = 54% - 46% = 8% of valid votes.\n8% of 81x = 1620\n(8/100) * 81x = 1620\nx = (1620 * 100) / (8 * 81) = 2000 / 8 = 250.\nTotal voters = 100x = 25000.",
      "shortTrick": "Total * 0.9 * 0.9 * 0.08 = 1620. Total * 0.0648 = 1620 => Total = 25000.",
      "commonMistake": "Calculating winner's share as 54% of TOTAL votes instead of VALID votes.",
      "timeSavingTip": "Work backward: 1620 is 8% of valid. Valid = 1620/0.08 = 20250. Valid is 81% of total. Total = 20250/0.81 = 25000."
    },
    "hints": [
      "Winning margin is 54% - 46% = 8% of VALID votes."
    ]
  },
  {
    "id": "d1-s5-q4",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 4,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Dishonest Dealer",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Amazon",
      "Oracle"
    ],
    "content": {
      "text": "A dishonest dealer professes to sell his goods at cost price, but he uses a weight of 900 grams for a kg weight. Find his gain percent."
    },
    "options": [
      {
        "id": "a",
        "text": "10%"
      },
      {
        "id": "b",
        "text": "11.11%"
      },
      {
        "id": "c",
        "text": "9%"
      },
      {
        "id": "d",
        "text": "12.5%"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "The dealer claims to sell at CP. This means selling price (SP) is the CP of 1000g.\nHowever, his actual cost is for only 900g, because that's what he gives.\nGain = True Weight - False Weight = 1000 - 900 = 100g.\nGain % = (Error / False Weight) * 100\nGain % = (100 / 900) * 100 = 11.11%.",
      "shortTrick": "Profit = 100g on a base of 900g. 1/9 = 11.11%.",
      "commonMistake": "Calculating gain % on the 1000g base (giving 10%).",
      "timeSavingTip": "Always use 'what the shopkeeper actually parts with' as the base for profit."
    },
    "hints": [
      "The cost price for the dealer is for 900g, but he gets paid for 1000g."
    ]
  },
  {
    "id": "d1-s5-q5",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 5,
    "type": "mcq",
    "category": "quant",
    "topic": "Profit & Loss",
    "subtopic": "Markup and Discount",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Walmart",
      "Adobe"
    ],
    "content": {
      "text": "A shopkeeper marks his goods 40% above the cost price and allows a discount of 25% on it. What is his net profit or loss percent?"
    },
    "options": [
      {
        "id": "a",
        "text": "15% profit"
      },
      {
        "id": "b",
        "text": "5% profit"
      },
      {
        "id": "c",
        "text": "5% loss"
      },
      {
        "id": "d",
        "text": "10% profit"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "Let the Cost Price (CP) be 100.\nMarked Price (MP) = 100 + 40% of 100 = 140.\nDiscount = 25% of MP = 25% of 140 = (1/4) * 140 = 35.\nSelling Price (SP) = MP - Discount = 140 - 35 = 105.\nProfit = SP - CP = 105 - 100 = 5.\nProfit % = 5%.",
      "shortTrick": "Successive formula: a + b + ab/100 => +40 - 25 - (40*25)/100 = 15 - 10 = 5%.",
      "commonMistake": "Simply subtracting discount from markup: 40 - 25 = 15%.",
      "timeSavingTip": "Use fractions: MP = 1.4 CP. SP = 0.75 MP. SP = 1.4 * 0.75 * CP = 1.05 CP."
    },
    "hints": [
      "Discount is always calculated on the marked price, not the cost price."
    ]
  },
  {
    "id": "d1-s5-q6",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 6,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Pointing at Photograph",
    "difficulty": "easy",
    "expectedTimeSeconds": 60,
    "companyTags": [
      "Accenture",
      "Wipro"
    ],
    "content": {
      "text": "Pointing to a man in a photograph, a woman said, 'His mother's only daughter is my mother.' How is the woman related to the man?"
    },
    "options": [
      {
        "id": "a",
        "text": "Sister"
      },
      {
        "id": "b",
        "text": "Niece"
      },
      {
        "id": "c",
        "text": "Wife"
      },
      {
        "id": "d",
        "text": "Daughter"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "'His mother's only daughter' means the man's sister.\nThe woman says, 'The man's sister is my mother.'\nTherefore, the man is the brother of the woman's mother.\nSo, the man is the woman's maternal uncle, which means the woman is his niece.",
      "shortTrick": "His mother's only daughter = His sister. His sister = My mother. Therefore, I am his niece.",
      "commonMistake": "Confusing the perspective and choosing Aunt or Daughter.",
      "timeSavingTip": "Break it down: [His mother's only daughter] -> Sister. [Sister] is [my mother]. Therefore, Niece."
    },
    "hints": [
      "Break the sentence into two parts starting from 'His mother's only daughter'."
    ]
  },
  {
    "id": "d1-s5-q7",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 7,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Coded Relations",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "JP Morgan",
      "Microsoft"
    ],
    "content": {
      "text": "If A + B means A is the brother of B; A - B means A is the father of B; A * B means A is the sister of B. Which of the following means M is the uncle of P?"
    },
    "options": [
      {
        "id": "a",
        "text": "M + K - P"
      },
      {
        "id": "b",
        "text": "M - K + P"
      },
      {
        "id": "c",
        "text": "P + K - M"
      },
      {
        "id": "d",
        "text": "M * K - P"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "Let's check option A: M + K - P.\nM + K means M is the brother of K.\nK - P means K is the father of P.\nSo, M is the brother of P's father K.\nThis means M is the paternal uncle of P.\nOption B: M is father of K, K is brother of P. M is father of P.\nOption C: P is brother of K, K is father of M. P is uncle of M.\nOption D: M is sister of K, K is father of P. M is aunt of P.",
      "shortTrick": "M must be male (needs + or -). M needs to be in the same generation as P's parent. M+K-P gives Brother of Father.",
      "commonMistake": "Ignoring the gender of M in coded expressions.",
      "timeSavingTip": "First eliminate options where M is female. M * K makes M female. Exclude D."
    },
    "hints": [
      "Find an expression where M is a brother to one of P's parents."
    ]
  },
  {
    "id": "d1-s5-q8",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 8,
    "type": "mcq",
    "category": "reasoning",
    "topic": "Blood Relations",
    "subtopic": "Family Tree",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Amazon",
      "Goldman Sachs"
    ],
    "content": {
      "text": "In a family of 6 members A, B, C, D, E, and F, there are two married couples. A is the doctor and the father of E. F is the grandfather of C and is a contractor. D is the grandmother of E and is a housewife. There is one doctor, one contractor, one nurse, one housewife and two students. What is the profession of B, if C is the sister of E?"
    },
    "options": [
      {
        "id": "a",
        "text": "Doctor"
      },
      {
        "id": "b",
        "text": "Nurse"
      },
      {
        "id": "c",
        "text": "Housewife"
      },
      {
        "id": "d",
        "text": "Student"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "F is the grandfather of C and D is the grandmother of E. Since C and E are siblings (C is sister of E), F and D are a married couple (Grandparents).\nF = Contractor (Male), D = Housewife (Female).\nA is the father of E and C. A = Doctor (Male).\nSince there are two married couples, A must be married to the remaining adult female, B.\nSo, B is the mother of C and E.\nThe professions known are: Contractor(F), Housewife(D), Doctor(A), Students(C and E). The remaining profession is Nurse.\nTherefore, B is a Nurse.",
      "shortTrick": "Identify adults vs children. Adults: A, B, D, F. F&D are grandparents. A is father. B must be mother. Remaining adult profession = Nurse.",
      "commonMistake": "Assuming B is a student, forgetting that E and C are the two children.",
      "timeSavingTip": "List professions: Doctor, Contractor, Nurse, Housewife. Assigned: F(Contractor), D(Housewife), A(Doctor). B is the only unassigned adult. B = Nurse."
    },
    "hints": [
      "Construct the family tree first. Identify the generations."
    ]
  },
  {
    "id": "d1-s5-q9",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 9,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "BFS vs DFS",
    "difficulty": "medium",
    "expectedTimeSeconds": 90,
    "companyTags": [
      "Google",
      "Microsoft",
      "Amazon"
    ],
    "content": {
      "text": "A graph has vertices A, B, C, D, E with edges (A,B), (A,C), (B,D), (C,E), (D,E). If a Breadth-First Search (BFS) is initiated from vertex A, and neighbors are visited in alphabetical order, what is the sequence of visited vertices?"
    },
    "options": [
      {
        "id": "a",
        "text": "A, B, C, D, E"
      },
      {
        "id": "b",
        "text": "A, B, D, E, C"
      },
      {
        "id": "c",
        "text": "A, C, B, E, D"
      },
      {
        "id": "d",
        "text": "A, B, C, E, D"
      }
    ],
    "correctAnswer": "a",
    "explanation": {
      "detailed": "BFS explores level by level.\nLevel 0: A is visited.\nQueue: [A]. Pop A.\nLevel 1: Neighbors of A are B and C. Alphabetical order -> visit B, then C.\nQueue: [B, C]. Pop B.\nLevel 2: Neighbors of B are A and D. A is already visited. Visit D.\nQueue: [C, D]. Pop C.\nNeighbors of C are A and E. A is already visited. Visit E.\nQueue: [D, E]. Pop D. E is visited. Pop E.\nThe sequence of visits is A, B, C, D, E.",
      "shortTrick": "BFS uses a Queue. A -> pushes B, C. Visits B, C. B pushes D. C pushes E. Sequence: A, B, C, D, E.",
      "commonMistake": "Confusing BFS (Queue/Level-order) with DFS (Stack/Depth-first) which would give A, B, D, E, C.",
      "timeSavingTip": "Identify level 1 neighbors (B,C) and level 2 neighbors (D,E). Ensure B,C appear before D,E."
    },
    "hints": [
      "BFS visits level by level, using a Queue. Visit all immediate neighbors before going deeper."
    ]
  },
  {
    "id": "d1-s5-q10",
    "dayNumber": 1,
    "sprintNumber": 5,
    "questionNumber": 10,
    "type": "mcq",
    "category": "cs-logic",
    "topic": "Graph Traversal",
    "subtopic": "Cycle Detection",
    "difficulty": "hard",
    "expectedTimeSeconds": 120,
    "companyTags": [
      "Goldman Sachs",
      "Flipkart"
    ],
    "content": {
      "text": "In a directed graph with N vertices and M edges, a Depth-First Search (DFS) is used to detect cycles. A cycle exists if and only if during the DFS traversal, we encounter an edge pointing to a vertex that is..."
    },
    "options": [
      {
        "id": "a",
        "text": "Already fully processed (black vertex)"
      },
      {
        "id": "b",
        "text": "Currently in the recursion stack (gray vertex)"
      },
      {
        "id": "c",
        "text": "Unvisited (white vertex)"
      },
      {
        "id": "d",
        "text": "An ancestor in a different connected component"
      }
    ],
    "correctAnswer": "b",
    "explanation": {
      "detailed": "In DFS for directed graphs, vertices can be in three states: Unvisited (White), Processing (Gray - in recursion stack), Fully Processed (Black).\nA cycle is detected when a 'back edge' is found. A back edge is an edge from a vertex to one of its ancestors in the DFS tree.\nAn ancestor is exactly a vertex that is currently being processed (it's in the recursion stack, or 'gray').\nEdges pointing to 'black' (cross edges/forward edges) do not form cycles in directed graphs.",
      "shortTrick": "Back edge = Cycle. Back edge points to a node currently in the call stack.",
      "commonMistake": "Confusing cycle detection in directed graphs with undirected graphs (where any visited node that isn't the direct parent forms a cycle).",
      "timeSavingTip": "Remember the color scheme: White=unvisited, Gray=in stack, Black=done. Cycle = Gray."
    },
    "hints": [
      "Think about the states of a vertex during DFS: unvisited, currently in stack, and completely finished."
    ]
  }
];
