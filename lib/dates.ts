export const REGIONAL_DATES = {
  IND: {
    early: "Sunday, 2 Nov, 2025",
    regular: "Sunday, 23 Nov, 2025",
    late: "Sunday, 30 Nov, 2025",
    testWindow: "Friday, 28 Nov – Monday, 1 Dec, 2025",
    testWindowShort: "28 Nov – 1 Dec, 2025",
    results: "December 13, 2025",
    fees: {
      early: {
        "1": "INR 1700",
        "2": "INR 2200", 
        "3": "INR 2500"
      },
      late: {
        "1": "INR 2700",
        "2": "INR 3300",
        "3": "INR 3300"
      }
    }
  },
  INT: {
    early: "Sunday, 16 Mar, 2025",
    regular: "Sunday, 23 Mar, 2025",
    late: "Friday, 28 Mar, 2025",
    testWindow: "Tuesday, 25 Mar – Saturday, 29 Mar, 2025",
    testWindowShort: "25 Mar – 29 Mar, 2025",
    results: "April 14, 2025",
    fees: {
      early: {
        "1": "AED 170",
        "2": "AED 210",
        "3": "AED 250"
      },
      late: {
        "1": "AED 300",
        "2": "AED 300", 
        "3": "AED 300"
      }
    }
  },
} as const; 