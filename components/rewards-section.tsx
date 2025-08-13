import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, Award, Star, Gift } from "lucide-react"

const rewards = [
  {
    icon: Trophy,
    title: "Gold Scholar",
    percentile: "95-99 Percentile",
    benefit: "Medal + Certificate",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: Medal,
    title: "Silver Scholar",
    percentile: "90-94 Percentile",
    benefit: "Medal + Certificate",
    color: "bg-gray-200 text-gray-700",
  },
  {
    icon: Award,
    title: "Bronze Scholar",
    percentile: "85-89 Percentile",
    benefit: "Medal + Certificate",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Star,
    title: "Participation Certificate",
    description: "All participants",
    benefit: "Official participation certificate",
    color: "bg-gray-100 text-gray-700",
  },
]

const prizes = [
  {
    title: "1st Prize",
    items: [
      { label: "All grades: iPad", img: "/media/ipad.png" },
    ],
    color: "bg-gradient-to-br from-yellow-100 to-yellow-50",
  },
  {
    title: "2nd Prize",
    items: [
      { label: "Grades 4-6: Tablet", img: "/media/tablet.png" },
      { label: "Grades 7-8: Apple Watch", img: "/media/watch.png" },
    ],
    color: "bg-gradient-to-br from-blue-100 to-blue-50",
  },
  {
    title: "3rd Prize",
    items: [
      { label: "Grades 4-6: Kindle", img: "/media/kindle.png" },
      { label: "Grades 7-8: Apple AirPods", img: "/media/airpods.png" },
    ],
    color: "bg-gradient-to-br from-indigo-100 to-indigo-50",
  },
]

export function RewardsSection() {
  return (
    <section id="rewards" className="py-10 bg-[#FFF7F7] border-t border-[#850101]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Rewards and Recognition</h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Recognition and rewards for academic excellence across different achievement levels
          </p>
        </div>

        {/* Prizes for toppers */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Prizes for toppers of each grade</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {prizes.map((prize, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform transform hover:-translate-y-2 hover:scale-105 md:hover:scale-110 text-gray-900"
              >
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  {/* Accent bar */}
                  <div className={`w-full h-2 ${prize.color}`}></div>
                  <h4 className="text-xl font-bold text-[#850101] text-center">{prize.title}</h4>

                  {/* Prize Images */}
                  <div className={`flex justify-center gap-4 ${index === 0 ? 'mt-2' : 'mt-6'}`}>
                    {prize.items.map((item, i) => (
                      <img
                        key={i}
                        src={item.img}
                        alt={item.label}
                        className={`${index === 0 ? 'w-36 h-36 md:w-44 md:h-44' : 'w-24 h-24 md:w-28 md:h-28'} object-contain`}
                      />
                    ))}
                  </div>

                  <div className={`flex flex-col gap-2 w-full items-center ${index === 0 ? 'mt-2' : 'mt-8'}`}>
                    {prize.items.map((item, i) => {
                      const parts = item.label.split(":");
                      const prefix = parts[0]?.trim() || "";
                      const device = parts.slice(1).join(":").trim();
                      return (
                        <p key={i} className="text-sm md:text-base text-gray-700">
                          {prefix && device ? (
                            <>
                              <span>{prefix}:</span>{" "}
                              <span className="font-bold text-[#850101]">{device}</span>
                            </>
                          ) : (
                            <span className="font-bold text-[#850101]">{item.label}</span>
                          )}
                        </p>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rewards.map((reward, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-[#850101]/30 ${reward.color}`}>
                  <reward.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-[#850101] mb-2">{reward.title}</h3>
                {reward.percentile && <p className="text-lg font-semibold text-gray-700 mb-3">{reward.percentile}</p>}
                {reward.description && <p className="text-gray-600 mb-3">{reward.description}</p>}
                <p className="text-sm font-medium text-gray-800 bg-white p-3 rounded-lg">{reward.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
