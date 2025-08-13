"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function PurdueProgrammePage() {
  return (
    <section className="py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-[#850101]">Purdue University – Gifted Education Research & Resource Institute (GER2I)</h1>

        {/* Video */}
        <AspectRatio ratio={16 / 9} className="mb-6">
          <iframe
            src="https://www.youtube.com/embed/N4dHQg-JBfU"
            title="Purdue GER2I overview"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </AspectRatio>

        <p className="mb-4">The <strong>Gifted Education Research & Resource Institute (GER2I)</strong> at Purdue University is an innovative centre dedicated to the discovery, study, and development of human potential. Founded in 1974, GER2I advances holistic development of giftedness, creativity, and talent through youth programmes, graduate degrees, professional development for educators, and cutting-edge research in psychology and education.</p>

        <h2 className="text-2xl font-bold mb-3">Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Grades&nbsp;5-12</strong></li>
          <li><strong>Ei ATS ≥ 90th percentile</strong> — Qualified</li>
          <li><strong>50-89th percentile</strong> — <em>Provisionally Qualified</em> (portfolio review)</li>
        </ul>
        <p className="mb-6"><em>Provisionally Qualified?</em> Include Ei ATS score report, school transcript, and <strong>two</strong> teacher recommendation letters (one from a current subject-relevant teacher).</p>

        <h2 className="text-2xl font-bold mb-3">Summer Residential Courses</h2>
        <div className="space-y-6 mb-6">
          <div>
            <h3 className="font-semibold">COMET&nbsp;| 1-week (Grades 5-6)</h3>
            <p className="text-sm text-gray-700">Choose one class per session. Commuter or residential options.</p>
            <p className="text-sm text-gray-700">Fee: <strong>$1,175</strong> commuter · <strong>$1,425</strong> residential (5 % Early-Bird discount through 15 Feb)</p>
          </div>
          <div>
            <h3 className="font-semibold">STAR&nbsp;| 2-week (Grades 7-9)</h3>
            <p className="text-sm text-gray-700">Select one morning &amp; one afternoon class per two-week session.</p>
            <p className="text-sm text-gray-700">Fee: <strong>$2,850</strong> per session (Early-Bird $2,707.50) · $5,700 for consecutive sessions</p>
          </div>
          <div>
            <h3 className="font-semibold">PULSAR&nbsp;| 2-week (Grades 10-12)</h3>
            <p className="text-sm text-gray-700">Advanced courses mirroring STAR structure.</p>
            <p className="text-sm text-gray-700">Fee: <strong>$2,850</strong> per session (Early-Bird $2,707.50) · $5,700 for consecutive sessions</p>
          </div>
        </div>
        <p className="mb-6 text-sm text-gray-600">Multiple-session, sibling, Purdue employee, and refer-a-friend discounts available.</p>

        <h2 className="text-2xl font-bold mb-3">Application Process</h2>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li>Register online at <a href="http://www.purdue.edu/conferences/GER2ISummerRes2025" target="_blank" className="text-blue-600 underline">purdue.edu/conferences/GER2ISummerRes2025</a></li>
          <li>New students: upload a 1-2 page essay or alternative media explaining motivation and desired courses.</li>
          <li>Upload Ei ATS percentile scores, transcript, and recommendation letters (portfolio applicants).</li>
        </ol>

        <p className="mb-6">Questions? Email <a href="mailto:geri@purdue.edu" className="text-blue-600 underline">geri@purdue.edu</a> or call +1&nbsp;765-494-7243.</p>

        <div className="mt-8 flex gap-4">
          <a
            href="http://www.purdue.edu/conferences/GER2ISummerRes2025"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-[#850101] text-white font-semibold rounded-lg hover:bg-[#650101] transition-colors"
          >
            Apply Now
          </a>
          <a
            href="/programmes#purdue"
            className="inline-flex items-center px-6 py-3 border-2 border-[#850101] text-[#850101] font-semibold rounded-lg hover:bg-[#850101] hover:text-white transition-colors"
          >
            Back to Partners
          </a>
        </div>
      </div>
    </section>
  );
} 