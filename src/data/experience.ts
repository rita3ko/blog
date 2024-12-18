export interface Role {
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  bulletPoints?: string[];
}

export interface Experience {
  company: string;
  location?: string;
  type: 'work' | 'education';
  summary?: string;
  roles: Role[];
}

export const experiences: Experience[] = [
  {
    company: "Cloudflare",
    location: "New York, NY",
    type: "work",
    summary: "I lead product for Cloudflare's developer platform, and have been working on it since its inception. I started as a solutions engineer, helping some of Cloudflare's first true enterprise customers onboard onto the service. When I first got to experience Workers, I realized that's how software should be built — enabling developers to write code without having to worry about the underlying infrastructure. I spent the past 7 years helping shape what such  a serverless platform would look like — what are the right primitives, and what's the right develoepr experience.",
    roles: [
      {
        title: "VP of Product",
        startDate: "2024-04",
        endDate: "present",
        description: "I currently lead the product team for Cloudflare's Developer Platform. "
      },
      {
        title: "Director of Product",
        startDate: "2021-05",
        endDate: "2024-04", 
        description: "As Director of Product for Workers, I helped bootstrap many efforts, including open-sourcing the Workers runtime, and getting Cloudflare's dev rel function up and running.   ",
        bulletPoints: [
          "Helped launch products to extend Cloudflare's developer stack, such as D1, and Workers for Platforms from MVP to GA",
          "Led strategic initiatives like open-sourcing the Workers runtime",
          "Helped launch Cloudflare's AI offering (Workers AI) to give develoeprs access to Cloudflare's edge",
          "Hired and managed a team of 6 product managers",
          "Hired and grew Cloudflare's dev rel team to 5 people, and helped with go to market activities to drive overall adoption"
        ]
      },
      {
        title: "Product Manager, Cloudflare Workers",
        startDate: "2018-08",
        endDate: "2021-05",
        description: "As the first PM for Cloudflare Workers, I helped define the roadmap and vision for the product. The strategy was to simplify every step of the developer journey to get them to success as quickly as possible. Launches that helped with this included: workers.dev, wrangler (Workers' CLI), Cloudflare Pages, wrangler tail (the first Workers observability and debugging tool), and wragler dev (the local development environment)."
      },
      {
        title: "Principal Solutions Engineer",
        startDate: "2018-02",
        endDate: "2018-08", 
        description: "Focused on helping customers adopt Cloudflare Workers when the product came out as a way to onboard them onto Cloudflare's services. I helped build out reference architectures and examples, and worked closely with the product and engineering team to help infulence the roadmap."
      },
      {
        title: "Solutions Engineer",
        startDate: "2016-06",
        endDate: "2018-02", 
        description: "Helped support customers from their initial interaction with Cloudflare during presales all the way through post-sales to make them successful. In presales, helped pitch and demo Cloudflare's products, and work with the customer to understand their current painpoints, and suggest paths forward to unblock them. The customer's journey doesn't stop there, however, and once they sign off you have to make them successful — as a solutions engineer, I helped do whatever it takes, from coming up with architectures to writing helper-scripts to get customers onboarded. "
      }
    ]
  },
  {
    company: "6sense",
    location: "San Francisco Bay Area",
    type: "work",
    summary: "At 6sense, I designed and developed the first iteration of the 2sense product, creating canonical synchronization across multiple CRM systems and data sources using map reduce. The system brought immediate predictive value to customers.\n\nI built the internal tooling that enabled customer success to onboard new customers efficiently, developing both the React UI and Django backend. This helped scale up customer deployments and reduced technical bottlenecks in the onboarding process.",
    roles: [
      {
        title: "Software Engineer",
        startDate: "2015-02",
        endDate: "2016-04",
        description: "Full-stack development focusing on predictive analytics and account-based marketing solutions. Technologies used included: Django, React, Nginx, Hadoop MapReduce, Apache Spark and Redshift."
      }
    ]
  },
  {
    company: "Microsoft",
    location: "Redmond, WA",
    type: "work",
    roles: [
      {
        title: "Program Manager",
        startDate: "2012-05",
        endDate: "2014-08",
        description: "I worked on the Windows Phone developer platform, designing and shipping the RelativeLayout component for developers building Windows Phone applications. The component helped developers create responsive layouts. I worked with the developer platform team to improve the overall development experience for Windows Phone developers."
      }
    ]
  },
  {
    company: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    type: "education",
    roles: [
      {
        title: "BS in Computer Science",
        startDate: "2011",
        endDate: "2014"
      }
    ]
  }
];
