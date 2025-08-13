"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function BerkeleyProgrammePage() {
  return (
    <section className="py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-[#850101]">UC Berkeley – Academic Talent Development Program (ATDP)</h1>
        <AspectRatio ratio={16 / 9} className="mb-6">
          <iframe
            src="https://www.youtube.com/embed/M3TyhYBDuGM"
            title="UC Berkeley ATDP overview"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </AspectRatio>
        <p className="mb-4">Established in 1868, <strong>UC Berkeley</strong> is the oldest and most renowned campus in the University of California system with over&nbsp;72 Nobel laureates among its faculty, alumni, and researchers. Located in the San Francisco Bay / Silicon Valley innovation corridor, it is frequently ranked the top public university in the world.</p>
        <p className="mb-4">Administered by the Graduate School of Education since 1982, <strong>ATDP</strong> offers challenging summer classes to motivated young scholars and acts as a college-preparation programme. Attendance records are recognised on the UC application platform, giving students an additional academic credential.</p>
        <p className="mb-6">ATDP’s <em>Global Program</em> (residential) wraps the Secondary Division curriculum with community service, outreach projects, college counselling, enrichment experiences, weekday/weekend activities, and full residential services (managed by CFM Educational Services).</p>

        <h2 className="text-2xl font-bold mb-3">Important Dates – 2025 Cohort</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Arrival / Departure:</strong>  13 Jul&nbsp;– 10 Aug&nbsp;2025</li>
          <li><strong>Admissions released:</strong>  31 Jan · 28 Feb · 31 Mar&nbsp;2025</li>
          <li><strong>Application&nbsp;→ Admission cycle:</strong> ≈ 2 weeks after completing requirements</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Students entering <strong>Grades 7-10</strong></li>
          <li><strong>≥ 80th percentile</strong> — Qualified with Priority Acceptance</li>
          <li><strong>50-79th percentile</strong> — <em>Provisionally Qualified</em> (portfolio review)</li>
        </ul>
        <p className="mb-6"><em>Provisionally Qualified?</em> Submit an Admission Portfolio containing Ei ATS percentile scores, transcript, and résumé of extracurriculars / honours.</p>

        <h2 className="text-2xl font-bold mb-3">Application Routes</h2>
        <ol className="list-decimal pl-6 space-y-2 mb-6">
          <li><strong>Online Program</strong> – Apply independently as “Non-Affiliated” via <a href="https://atdp.berkeley.edu/" target="_blank" className="text-blue-600 underline">atdp.berkeley.edu</a></li>
          <li><strong>Campus Residential Program</strong> – Email <a href="mailto:BerkeleyATDP@cfmedu.com" className="text-blue-600 underline">BerkeleyATDP@cfmedu.com</a> (CFM Educational Services) for eligibility confirmation and application packet.</li>
        </ol>

        <h2 className="text-2xl font-bold mb-3">Academic Tracks (choose 1)</h2>
        <ul className="list-disc pl-6 space-y-1 mb-6">
          <li><strong>Social Studies:</strong> Social Psychology · American Culture & Society</li>
          <li><strong>Business:</strong> Business & US Economy · The Practice of Law</li>
          <li><strong>Science:</strong> Advanced Biotechnology · Advanced Chemistry</li>
          <li><strong>Technology:</strong> Advanced Robotics Engineering · Exploring Data Science</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Beyond the Classroom</h2>
        <p className="mb-4">Afternoons focus on social development: community-service placements at Bay-Area NGOs and counsellor-led outreach / environmental projects.</p>
        <p className="mb-6">Evenings &amp; weekends feature college counselling, Silicon Valley tech-company visits, ATDP Prom &amp; Talent Show, white-water rafting, Six Flags Discovery Kingdom, San Francisco &amp; Santa Cruz excursions, and more.</p>

        <h2 className="text-2xl font-bold mb-3">Programme Fees &amp; Scholarship</h2>
        <p className="mb-6">Comprehensive fee covers 29 days (SFO arrival → departure) excluding textbooks/materials. Merit-based scholarships are available for qualified Ei ATS students.</p>

        <div className="mt-8 flex gap-4">
          <a
            href="https://atdp.berkeley.edu/"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-[#850101] text-white font-semibold rounded-lg hover:bg-[#650101] transition-colors"
          >
            Apply Now
          </a>
          <a
            href="/programmes#uc-berkeley"
            className="inline-flex items-center px-6 py-3 border-2 border-[#850101] text-[#850101] font-semibold rounded-lg hover:bg-[#850101] hover:text-white transition-colors"
          >
            Back to Partners
          </a>
        </div>
      </div>
    </section>
  );
} 