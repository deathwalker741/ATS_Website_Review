"use client"

export default function CTYProgrammePage() {
  return (
    <section className="py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-[#850101]">Johns Hopkins Center for Talented Youth (CTY)</h1>
        <p className="mb-4">The Center for Talented Youth (CTY), a nonprofit academic centre of Johns Hopkins University, delivers academic excellence and transformational experiences to advanced learners in <strong>grades 2-12</strong>.</p>
        <p className="mb-4">Founded in 1979, CTY fosters intellectual growth in exceptional students from all backgrounds and communities. As a world leader in gifted education, advocacy and research, CTY provides:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Accredited, advanced online and on-campus courses often not found in school</li>
          <li>Personalised instruction</li>
          <li>An inclusive community of peers who share a passion for learning</li>
        </ul>
        <p className="mb-6">Advanced students thrive when they accelerate their learning, challenge themselves, and follow their curiosity in a safe, supportive environment.</p>

        <h2 className="text-2xl font-bold mb-3">Programme Details</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Online Program&nbsp;| Grades 2-12:</strong> Real-time, self-paced, session-based and individually paced courses. <a href="https://cty.jhu.edu/programs/online/courses" className="text-blue-600 underline" target="_blank">Learn more</a></li>
          <li><strong>On-Campus Summer Programs&nbsp;| Grades 2-12:</strong> Join a community of young scholars tackling exciting and challenging subjects. <a href="https://cty.jhu.edu/programs/on-campus" className="text-blue-600 underline" target="_blank">Learn more</a></li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>98th percentile in English&nbsp;— qualifies for Humanities &amp; Writing tracks</li>
          <li>98th percentile in Math&nbsp;— qualifies for Math &amp; Science tracks</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Helpful Resources</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>CTY On-Campus Summer Programs</li>
          <li>CTY Online Programs</li>
          <li>Testing and Eligibility</li>
          <li>CTY YouTube Channel</li>
          <li>Facebook Parents Group</li>
          <li>CTY Webinars</li>
          <li>CTY Events Calendar</li>
        </ul>

        <p className="mb-6">For queries, email <a href="mailto:ctyinfo@jhu.edu" className="text-blue-600 underline">ctyinfo@jhu.edu</a>. We look forward to welcoming you to one of our programmes soon.</p>

        <div className="mt-8 flex gap-4">
          <a
            href="https://cty.jhu.edu/"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-[#850101] text-white font-semibold rounded-lg hover:bg-[#650101] transition-colors"
          >
            Apply Now
          </a>
          <a
            href="/programmes#johns-hopkins"
            className="inline-flex items-center px-6 py-3 border-2 border-[#850101] text-[#850101] font-semibold rounded-lg hover:bg-[#850101] hover:text-white transition-colors"
          >
            Back to Partners
          </a>
        </div>
      </div>
    </section>
  );
} 