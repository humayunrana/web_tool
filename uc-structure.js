const categoryMap = {
    'career': { name: 'Career', class: 'category-career', order: 1 },
    'cultural': { name: 'Cultural', class: 'category-cultural', order: 2 },
    'admission': { name: 'Admission', class: 'category-admission', order: 3 },
    'financial': { name: 'Financial', class: 'category-financial', order: 4 }
};

const defaultCriteria = [
    {
        id: 1,
        name: "Job Prospects after Degree",
        weight: 10,
        description: "Employment rate of graduates within some months of completion of program.",
        category: "career",
        options: [
            { value:10, label: "High (>90% employment)" },
            { value: 8, label: "Good (>75% employment)" },
            { value: 5, label: "Moderate (>60% employment)" },
            { value: 3, label: "Low (>40% employment)" },
            { value: 0, label: "Very Low (<30% employment)" }
        ]
    },
    {
        id: 2,
        name: "Post-Degree Stay Options",
        weight: 7,
        description: "Possibiliy of staying within that area after the program finishes.",
        category: "career",
        options: [
            { value:10, label: "Pathway to permanent residency" },
            { value: 7, label: "Multiple stay/work options" },
            { value: 4, label: "Reasonable stay for job search" },
            { value: 3, label: "- I am already national -" },
            { value: 2, label: "Short stay for job search" },
            { value: 0, label: "Stay allowed with job only" }
        ]
    },
    {
        id: 3,
        name: "Country Visa/Travel Policy",
        weight: 6,
        description: "Student visa process and feasibility of personal and family traveling.",
        category: "cultural",
        options: [
            { value:10, label: "- I am already national -" },
            { value: 9, label: "Very Easy (friendly, flexible)" },
            { value: 6, label: "Easy (moderate like most countries)" },
            { value: 3, label: "Rules-based (strict but clear)" },
            { value: 0, label: "Very strict visa policy" }
        ]
    },
    {
        id: 4,
        name: "Global Recognition",
        weight: 7,
        description: "How other countries, students, researchers and institutes see this institute for this program.",
        category: "career",
        options: [
            { value:10, label: "Very Popular" },
            { value: 7, label: "Popular" },
            { value: 4, label: "Well-known" },
            { value: 2, label: "Recognized" },
            { value: 0, label: "Mostly Local" }
        ]
    },
    {
        id: 5,
        name: "Practice w.r.t. My Religion",
        weight: 7,
        description: "Freedom and facilities for my religious practices.",
        category: "cultural",
        options: [
            { value:10, label: "My religion is majority" },
            { value: 7, label: "Freely allowed to practice" },
            { value: 3, label: "Allowed with some restrictions" },
            { value: 0, label: "Hard to practice my religion" }
        ]
    },
    {
        id: 6,
        name: "Local Culture w.r.t. me",
        weight: 6,
        description: "How much is the culture acceptable for me.",
        category: "cultural",
        options: [
            { value:10, label: "Culture familiar to me" },
            { value: 7, label: "Culture acceptable for me" },
            { value: 3, label: "Culture has some issues for me" },
            { value: 0, label: "Culture not aligned with me" }
        ]
    },
    {
        id: 7,
        name: "Safety & Quality of Life",
        weight: 4,
        description: "Personal safety and living standards.",
        category: "cultural",
        options: [
            { value:10, label: "Very Safe" },
            { value: 7, label: "Generally Safe" },
            { value: 4, label: "Low Security concerns" },
            { value: 0, label: "Risky/Safety concerns" }
        ]
    },
    {
        id: 8,
        name: "Global Rank",
        weight: 5,
        description: "As a combined average where the university stands for QS, THE and other ranks.",
        category: "career",
        options: [
            { value:10, label: "Among Top 20 worldwide" },
            { value: 9, label: "Among Top 50 worldwide" },
            { value: 8, label: "Among Top 120 worldwide" },
            { value: 7, label: "Among Top 200 worldwide" },
            { value: 6, label: "Among Top 350 worldwide" },
            { value: 5, label: "Among Top 500 worldwide" },
            { value: 3, label: "Among Top 700 worldwide" },
            { value: 2, label: "Among Top 1000 worldwide" },
            { value: 1, label: "Among Top 1500 worldwide" },
            { value: 0, label: "Low Ranking" }
        ]
    },
    {
        id: 9,
        name: "Admission Criteria",
        weight: 5,
        description: "Competitiveness and requirements",
        category: "admission",
        options: [
            { value:10, label: "Very Competitive (high marks/SAT)" },
            { value: 7, label: "Competitive (good marks/SAT)" },
            { value: 4, label: "Moderate (decent marks/scores)" },
            { value: 0, label: "Easy" }
        ]
    },
    {
        id: 10,
        name: "Admission Success Rate",
        weight: 5,
        description: "Likelihood of getting accepted",
        category: "admission",
        options: [
            { value:10, label: "Highly selective (<20% acceptance)" },
            { value: 7, label: "Selective (20-40% acceptance)" },
            { value: 4, label: "Moderate (40-60% acceptance)" },
            { value: 0, label: "High acceptance (>60%)" }
        ]
    },
    {
        id: 11,
        name: "Scholarship Availability",
        weight: 5,
        description: "Availability of financial aid to reduce the cost.",
        category: "financial",
        options: [
            { value:10, label: "High chance of scholarship" },
            { value: 7, label: "Moderate chance of scholarship" },
            { value: 3, label: "Scholarships not common/unclear" },
            { value: 0, label: "No scholarships available" }
        ]
    },
    {
        id: 12,
        name: "Degree Duration",
        weight: 3,
        description: "Typical program length in years.",
        category: "admission",
        options: [
            { value:10, label: "3 Years" },
            { value: 7, label: "4 Years" },
            { value: 0, label: "5 Years" }
        ]
    },
    {
        id: 13,
        name: "Tuition Fee",
        weight: 8,
        description: "Total tuition cost for entire program.",
        category: "financial",
        options: [
            { value:10, label: "$3,000 -" },
            { value: 9, label: "$6,000" },
            { value: 8, label: "$10,000" },
            { value: 7, label: "$15,000" },
            { value: 6, label: "$22,000" },
            { value: 5, label: "$30,000" },
            { value: 4, label: "$40,000" },
            { value: 3, label: "$52,000" },
            { value: 2, label: "$65,000" },
            { value: 1, label: "$80,000" },
            { value: 0, label: "$95,000 +" }
        ]
    },
    {
        id: 14,
        name: "Accommodation / Stay",
        weight: 5,
        description: "Housing / Hostel costs for entire program duration incl. rent, electricity, water, internet.",
        category: "financial",
        options: [
            { value:10, label: "$0" },
            { value: 8, label: "$8,000" },
            { value: 6, label: "$15,000" },
            { value: 4, label: "$24,000" },
            { value: 2, label: "$35,000" },
            { value: 0, label: "$50,000" }
        ]
    },
    {
        id: 15,
        name: "Living / Moving Expenses",
        weight: 5,
        description: "Living costs for entire program incl. food, maneuvering, phone, clothing. ",
        category: "financial",
        options: [
            { value:10, label: "$0" },
            { value: 8, label: "$8,000" },
            { value: 6, label: "$15,000" },
            { value: 4, label: "$24,000" },
            { value: 2, label: "$35,000" },
            { value: 0, label: "$50,000" }
        ]
    },
    {
        id: 16,
        name: "Other Fees / Payments",
        weight: 3,
        description: "Additional academic fees for complete program like examination, admission, security, library, books etc.",
        category: "financial",
        options: [
            { value:10, label: "$1,000" },
            { value: 8, label: "$1,600" },
            { value: 6, label: "$2,500" },
            { value: 4, label: "$3,500" },
            { value: 2, label: "$5,000" },
            { value: 0, label: "$7,000" }
        ]
    },
    {
        id: 17,
        name: "Health Insurance & Medical",
        weight: 3,
        description: "Health coverage for complete program.",
        category: "financial",
        options: [
            { value:10, label: "$0" },
            { value: 7, label: "$300" },
            { value: 5, label: "$600" },
            { value: 3, label: "$1,000" },
            { value: 1, label: "$1,500" },
            { value: 0, label: "$2,200" }
        ]
    },
    {
        id: 18,
        name: "Return Air Ticket Cost",
        weight: 3,
        description: "Round trip for the country where family staying as it will need multiple travels.",
        category: "financial",
        options: [
            { value:10, label: "$0" },
            { value: 8, label: "$250" },
            { value: 6, label: "$400" },
            { value: 4, label: "$650" },
            { value: 2, label: "$1,000" },
            { value: 0, label: "$1,400" }
        ]
    },
    {
        id: 19,
        name: "Part-Time Work with Study",
        weight: 3,
        description: "Work opportunities while studying.",
        category: "financial",
        options: [
            { value:10, label: "Easily available (20 hrs/week)" },
            { value: 7, label: "Limited (9-15 hrs/week)" },
            { value: 3, label: "Difficult to find (<8 hrs/week)" },
            { value: 0, label: "No work allowed" }
        ]
    }
];