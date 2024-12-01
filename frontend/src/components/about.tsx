import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    image: "https://utfs.io/f/3742aded-da5b-4fcc-ac74-2e92644a3316-oehb7x.png",
    bio: "Jane has over 15 years of experience in the tech industry and is passionate about creating innovative solutions."
  },
  {
    name: "John Smith",
    role: "CTO",
    image: "https://utfs.io/f/3742aded-da5b-4fcc-ac74-2e92644a3316-oehb7x.png",
    bio: "John is a seasoned developer with expertise in scalable architecture and emerging technologies."
  },
  {
    name: "Emily Brown",
    role: "Head of Design",
    image: "https://utfs.io/f/3742aded-da5b-4fcc-ac74-2e92644a3316-oehb7x.png",
    bio: "Emily brings creativity and user-centric design principles to every project she touches."
  },
  {
    name: "Michael Lee",
    role: "Lead Developer",
    image: "https://utfs.io/f/3742aded-da5b-4fcc-ac74-2e92644a3316-oehb7x.png",
    bio: "Michael is a full-stack developer with a knack for solving complex problems and mentoring junior developers."
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Our Company</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-muted-foreground">
          At TechInnovate, we strive to create cutting-edge solutions that transform the way people interact with technology.
          Our mission is to make complex technologies accessible and user-friendly, empowering businesses and individuals alike.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg text-muted-foreground">
          Founded in 2010, TechInnovate began as a small startup with big dreams. Over the years, we've grown into a
          leading tech company, known for our innovative products and exceptional customer service. Our journey is marked
          by continuous learning, adaptation, and a commitment to excellence.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name}>
              <CardHeader className="p-3">
                <img
                  src={member.image}
                  alt={member.name}
                  // width={100}
                  // height={100}
                  className="rounded mx-auto mb-4"
                />
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
