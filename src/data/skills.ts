export interface SkillItem {
  name: string
  logo?: string
}

export interface SkillCategory {
  category: string
  items: SkillItem[]
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Expo", logo: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg" },
    ],
  },
  {
    category: "Styling",
    items: [
      { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "NativeWind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
      { name: "REST APIs" },
    ],
  },
  {
    category: "AWS",
    items: [
      { name: "Lambda", logo: "https://icon.icepanel.io/AWS/svg/Compute/Lambda.svg" },
      { name: "EC2", logo: "https://icon.icepanel.io/AWS/svg/Compute/EC2.svg" },
      { name: "S3", logo: "https://icon.icepanel.io/AWS/svg/Storage/Simple-Storage-Service.svg" },
      { name: "RDS", logo: "https://icon.icepanel.io/AWS/svg/Database/RDS.svg" },
      { name: "DynamoDB", logo: "https://icon.icepanel.io/AWS/svg/Database/DynamoDB.svg" },
      { name: "CloudFront", logo: "https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/CloudFront.svg" },
      { name: "API Gateway", logo: "https://icon.icepanel.io/AWS/svg/App-Integration/API-Gateway.svg" },
      { name: "Step Functions", logo: "https://icon.icepanel.io/AWS/svg/App-Integration/Step-Functions.svg" },
      { name: "Systems Manager", logo: "https://icon.icepanel.io/AWS/svg/Management-Governance/Systems-Manager.svg" },
      { name: "IAM", logo: "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/IAM-Identity-Center.svg" },
      { name: "Route 53", logo: "https://icon.icepanel.io/AWS/svg/Networking-Content-Delivery/Route-53.svg" },
      { name: "Secrets Manager", logo: "https://icon.icepanel.io/AWS/svg/Security-Identity-Compliance/Secrets-Manager.svg" },
      { name: "CloudWatch", logo: "https://icon.icepanel.io/AWS/svg/Management-Governance/CloudWatch.svg" },
      { name: "Serverless", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    ],
  },
  {
    category: "Azure",
    items: [
      { name: "Logic Apps", logo: "https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-icons/Logic-Apps.svg" },
      { name: "Functions", logo: "https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-icons/Function-Apps.svg" },
      { name: "Blob Storage", logo: "https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-icons/Storage-Accounts.svg" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "DynamoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg" },
      { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    category: "Platforms & Observability",
    items: [
      { name: "Contentful CMS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/contentful.svg" },
      { name: "Datadog", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/datadog/datadog-original.svg" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Azure DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Jest", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
      { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    ],
  },
  {
    category: "Leadership & Process",
    items: [
      { name: "Team Leadership & Mentoring" },
      { name: "Scrum Master / Agile-Scrum" },
      { name: "Architecture & Technical Planning" },
      { name: "Code Review & Delivery Ownership" },
    ],
  },
]
