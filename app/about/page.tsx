import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Users, Award, Truck, Shield, HeartHandshake } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">Біз туралы</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Device Shop - Қазақстандағы жетекші компьютерлік техника дүкені. Біз 2015 жылдан бері сапалы өнімдер мен
                кәсіби қызметті ұсынып келеміз.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop">
                  <Button size="lg">Каталогты көру</Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" size="lg">
                    Көмек алу
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <p className="text-muted-foreground">Қанағаттанған клиенттер</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <p className="text-muted-foreground">Өнім түрлері</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <p className="text-muted-foreground">Жыл тәжірибе</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Неліктен бізді таңдайды?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Біз клиенттерімізге ең жақсы қызмет көрсету үшін күн сайын жұмыс істейміз
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Сапалы өнімдер</h3>
                  <p className="text-muted-foreground">Тек танымал брендтердің түпнұсқа өнімдерін ұсынамыз</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Жылдам жеткізу</h3>
                  <p className="text-muted-foreground">Алматы бойынша 1-2 күнде, Қазақстан бойынша 3-5 күнде жеткізу</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Кепілдік</h3>
                  <p className="text-muted-foreground">Барлық өнімдерге ресми кепілдік және сервистік қызмет</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Кәсіби команда</h3>
                  <p className="text-muted-foreground">Тәжірибелі мамандар кез келген сұрақ бойынша көмектеседі</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Monitor className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Кең ассортимент</h3>
                  <p className="text-muted-foreground">
                    5000+ өнім түрі - процессорлардан перифериялық құрылғыларға дейін
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <HeartHandshake className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Клиентке бағдарлану</h3>
                  <p className="text-muted-foreground">Әрбір клиентке жеке көзқарас және кәсіби кеңес</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Байланыс ақпараты</h2>
              <p className="text-xl text-muted-foreground mb-8">Сұрақтарыңыз бар ма? Бізбен байланысыңыз!</p>

              <div className="space-y-4 mb-8">
                <p className="text-lg">
                  <strong>Телефон:</strong> +7 (727) 123-4567
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> support@deviceshop.kz
                </p>
                <p className="text-lg">
                  <strong>Мекенжай:</strong> Алматы қ., Абай даңғылы 150
                </p>
                <p className="text-lg">
                  <strong>Жұмыс уақыты:</strong> Дүйсенбі - Жексенбі: 9:00 - 21:00
                </p>
              </div>

              <Link href="/chat">
                <Button size="lg">AI көмекшісімен сөйлесу</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
