"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    url: "https://www.nature.com/articles/537152a",
    title: "How to raise a genius"
  },
  {
    url: "https://www.deccanherald.com/education/identifying-and-nurturing-giftedness-3040720",
    title: "Identifying and nurturing giftedness"
  },
  {
    url: "https://giftedworld.org/the-imperative-of-nurturing-giftedness-in-education/",
    title: "The Imperative of Nurturing Giftedness in Education"
  },
  {
    url: "https://www.apa.org/education-career/k12/gifted",
    title: "Gifted and Talented Education"
  },
  {
    url: "https://www.tandfonline.com/doi/full/10.1080/02783193.2025.2466514#d1e152",
    title: "The Complexity, Autonomy, Authenticity, and Support (CAAS) Framework for Gifted Students' Needs in Technology Education: A Systematic Literature Review"
  },
  {
    url: "https://www.researchgate.net/publication/268522910_Research_on_Giftedness_and_Gifted_Education_Status_of_the_Field_and_Considerations_for_the_Future",
    title: "Research on Giftedness and Gifted Education: Status of the Field and Considerations for the Future"
  },
  {
    url: "https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2022.1073007/full",
    title: "Giftedness and gifted education: A systematic literature review"
  },
  {
    url: "https://www.sciencedirect.com/science/article/pii/S2405844024129398",
    title: "Unpacking the underachievement of gifted students: A systematic review of internal and external factors"
  },
  {
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8293250/",
    title: "Improving Gifted Talent Development Can Help Solve Multiple Consequential Real-World Problems"
  },
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/resources">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Resources
          </Link>
        </Button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Articles &amp; Research Papers on Gifted Education</h1>

        <div className="space-y-6">
          {articles.map((article, idx) => (
            <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-[#850101]">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {article.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
                  {article.url}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 