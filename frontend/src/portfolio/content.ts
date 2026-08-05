import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  GitBranch,
  Mail
} from "lucide-react";
import type { PortfolioContent } from "./types";

const githubProfile = "https://github.com/Sharanmankala";
const linkedinProfile = "https://www.linkedin.com/in/sai-sharan-mankala-0217563b9";
const resumePath = "/resume.pdf";
const emailAddress = "msaisharan73@gmail.com";

export const portfolioContent: PortfolioContent = {
  name: "Sai Sharan",
  title: "AI/ML Engineer | Search, Forecasting, and Distributed Systems",
  intro:
    "AI/ML Engineer with 4+ years of experience building production search, retrieval, ranking, and real-time ML systems. Skilled in Python, PyTorch, Elasticsearch, FAISS, BM25, dense embeddings, cross-encoder reranking, Kafka, Kubernetes, AWS, and backend engineering.",
  location: "San Francisco, CA",
  availability: "Open to AI/ML opportunities",
  profileImage: "/profile-photo.jpg",
  email: emailAddress,
  githubUrl: githubProfile,
  linkedinUrl: linkedinProfile,
  navItems: [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "contact", label: "Contact" }
  ],
  heroStats: [
    { label: "Experience", value: "4+ years" },
    { label: "Focus", value: "Search, Retrieval, Ranking" },
    { label: "Impact", value: "1M+ daily users" },
    { label: "Strength", value: "Distributed ML Systems" }
  ],
  heroActions: [
    { label: "Download Resume", url: resumePath, icon: Download, variant: "primary", download: true },
    { label: "View Projects", url: "#projects", icon: ArrowUpRight, variant: "secondary" },
    { label: "GitHub", url: githubProfile, icon: GitBranch, variant: "ghost" },
    { label: "LinkedIn", url: linkedinProfile, icon: BriefcaseBusiness, variant: "ghost" }
  ],
  socialLinks: [
    { label: "LinkedIn", url: linkedinProfile, icon: BriefcaseBusiness },
    { label: "GitHub", url: githubProfile, icon: GitBranch },
    { label: "Resume", url: resumePath, icon: Download, download: true },
    { label: "Email", url: `mailto:${emailAddress}`, icon: Mail }
  ],
  contactActions: [
    { label: "Email Me", url: `mailto:${emailAddress}`, icon: Mail, variant: "primary" },
    { label: "LinkedIn", url: linkedinProfile, icon: BriefcaseBusiness, variant: "secondary" },
    { label: "GitHub", url: githubProfile, icon: GitBranch, variant: "secondary" },
    { label: "Download Resume", url: resumePath, icon: Download, variant: "ghost", download: true }
  ],
  experience: [
    {
      company: "Perplexity",
      role: "AI/ML Engineer",
      period: "Mar 2025 - Present | San Francisco, CA",
      description:
        "Built and deployed end-to-end AI search and agentic workflows spanning query understanding, retrieval, reasoning, evaluation, backend services, and production deployment.",
      highlights: [
        "Built end-to-end AI search workflows combining transformer-based query understanding, semantic classification, routing, retrieval, and grounded response generation using Python, PyTorch, Hugging Face Transformers, and LoRA, improving response accuracy by 32% across production systems serving 100,000+ daily users.",
        "Built an automated RAGAS-based offline evaluation gate into the deployment pipeline using failed production and synthetic queries, preventing regression recurrence and reducing hallucination rates by 19%.",
        "Diagnosed hybrid retrieval latency spikes across BM25, dense retrieval, and cross-encoder reranking, fixed Redis cache invalidation and slow-path routing issues, and reduced p95 search latency by 27%.",
        "Translated complex user requests into LangGraph-based agentic workflows for multi-step retrieval, tool calling, structured reasoning, retries, checkpointing, and partial-failure recovery.",
        "Engineered real-time ingestion and indexing pipelines using Kafka, PySpark, Airflow, and AWS S3 to maintain index freshness and scale across billions of searchable documents."
      ],
      focus: [
        "Python",
        "PyTorch",
        "Hugging Face",
        "LoRA",
        "FAISS",
        "Elasticsearch",
        "BM25",
        "Cross-Encoder Reranking",
        "FastAPI",
        "LangGraph",
        "RAGAS",
        "Redis",
        "Kafka",
        "Docker",
        "Kubernetes",
        "AWS"
      ]
    },
    {
      company: "Amazon",
      role: "Machine Learning Engineer",
      period: "Apr 2021 - Jun 2024 | India",
      description:
        "Built and deployed large-scale demand forecasting systems powering automated inventory planning across Amazon's fulfillment network.",
      highlights: [
        "Partnered with engineering and supply-chain stakeholders to translate inventory-planning requirements into probabilistic forecasting systems using PyTorch, DeepAR, and GluonTS, improving forecast accuracy by 34% and reducing stockouts by 27% across 3,000+ internal users.",
        "Improved forecast accuracy by 18% and reduced stockout rates by 16% by incorporating historical demand, seasonality, promotions, and regional purchasing patterns into time-series models and validating changes before deployment.",
        "Developed distributed feature-engineering and data-processing pipelines using Python, Apache Spark, SQL, and Airflow to handle high-volume transactional data, late-arriving records, and inconsistent regional inputs.",
        "Automated model training, validation, and batch-inference workflows using AWS SageMaker, EC2, S3, and EMR, reducing retraining time by 22% and enabling reproducible forecasting updates across production environments.",
        "Built backend prediction services using Java, Scala, REST APIs, and gRPC and deployed forecasting applications with Docker, Kubernetes, CI/CD, and CloudWatch, reducing deployment time by 31%."
      ],
      focus: [
        "Python",
        "PyTorch",
        "DeepAR",
        "GluonTS",
        "Scala",
        "Spark",
        "Airflow",
        "SQL",
        "Kafka",
        "Java",
        "Docker",
        "AWS",
        "SageMaker"
      ]
    }
  ],
  projects: [
    {
      slug: "crash-intelligence",
      title: "Large-Scale AI Traffic Risk Forecasting and Hotspot Prediction Platform",
      shortDescription:
        "An end-to-end machine learning platform for statewide traffic risk classification, hotspot prediction, and temporal forecasting built on 20+ years of California crash data.",
      problem:
        "Transportation and safety planning teams need more than static crash reporting. They need predictive risk classification, hotspot detection, and temporal forecasting in one usable workflow.",
      build:
        "I engineered an end-to-end machine learning platform using Python, XGBoost, FastAPI, Pandas, GeoPandas, and Scikit-learn to perform statewide traffic risk classification, hotspot prediction, temporal forecasting, and AI-assisted risk analysis.",
      architecture: [
        "Ingested and cleaned 20+ years of California crash and weather-enriched transportation data into reusable analysis pipelines",
        "Developed scalable ETL, feature engineering, and geospatial aggregation workflows leveraging temporal features, weather signals, and road characteristics",
        "Trained Random Forest and XGBoost models for severity prediction and built hotspot prediction pipelines for regional risk modeling",
        "Produced weekly and monthly forecasting outputs and grid-based crash risk scoring for operational planning",
        "Integrated SHAP explainability, anomaly detection, hotspot stability analysis, and interactive dashboard views for analyst-friendly exploration"
      ],
      techStack: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "XGBoost",
        "FastAPI",
        "GeoPandas",
        "OSMnx",
        "HDBSCAN",
        "Tableau",
        "SHAP",
        "Plotly",
        "Explainable AI"
      ],
      results: [
        "Unified classification, hotspot analysis, and forecasting into one risk-intelligence workflow",
        "Made statewide risk patterns easier to inspect with geospatial exploration and explainability views",
        "Created a strong portfolio project that maps directly to AI/ML, forecasting, and platform engineering roles"
      ],
      images: [
        {
          src: "/portfolio/crash/hotspot-analysis-dashboard.png",
          alt: "Crash hotspot dashboard",
          label: "Hotspot dashboard",
          description: "Spatial clustering and regional risk patterns shown through a map-first investigation view."
        },
        {
          src: "/portfolio/crash/forecasting-analytics-dashboard.png",
          alt: "Forecasting analytics dashboard",
          label: "Forecasting dashboard",
          description: "Forecast views built for trend tracking, statewide comparisons, and operational planning."
        },
        {
          src: "/portfolio/crash/ai-forecast-assistant-overview.png",
          alt: "AI forecast assistant overview",
          label: "AI assistant",
          description: "An AI-assisted layer that helps explain predictions and explore forecast corrections."
        }
      ],
      githubUrl: githubProfile,
      expandable: true
    },
    {
      slug: "log-intelligence",
      title: "Log Intelligence Pipeline",
      shortDescription:
        "A FastAPI and Next.js log analysis system that ingests logs, clusters incidents, and returns structured insights for debugging and triage.",
      problem:
        "Raw logs are noisy and hard to inspect quickly during incidents. Teams need a way to upload, group, and review incident patterns without reading each line manually.",
      build:
        "I built a local log intelligence platform with upload APIs, clustering by service and severity, a structured frontend dashboard, and a backend layout that is ready for AI summarization and root-cause analysis.",
      architecture: [
        "Accepted uploaded logs through a FastAPI service",
        "Stored and organized logs with a lightweight local persistence layer",
        "Clustered records by service, severity, and time range for triage",
        "Presented grouped incidents in a Next.js dashboard with detail views",
        "Structured the project for future AI summarization and debugging workflows"
      ],
      techStack: [
        "Python",
        "FastAPI",
        "SQLite",
        "Next.js",
        "TypeScript",
        "REST APIs",
        "JSON storage",
        "Docker-ready structure"
      ],
      results: [
        "Turned unstructured logs into grouped, navigable incident clusters",
        "Reduced the friction of local debugging and incident review",
        "Created a clean foundation for later AI-assisted observability features"
      ],
      images: [
        {
          src: "/portfolio/log/log-intelligence-dashboard.png",
          alt: "Log intelligence dashboard",
          label: "Cluster dashboard",
          description: "Grouped incident clusters and triage views for reviewing logs by service, severity, and time."
        },
        {
          src: "/portfolio/log/log-intelligence-swagger.png",
          alt: "Log intelligence API documentation",
          label: "API surface",
          description: "Swagger documentation covering health checks, uploads, and cluster inspection endpoints."
        }
      ],
      githubUrl: githubProfile,
      expandable: true
    },
    {
      slug: "nominatim-docker",
      title: "Docker Nominatim Containerization",
      shortDescription:
        "Containerized and configured a Nominatim geocoding setup using Docker for local geospatial data workflows.",
      problem:
        "Local geospatial experimentation often breaks down on setup complexity, especially when OpenStreetMap and PostGIS dependencies are involved.",
      build:
        "I containerized Nominatim for a repeatable local development flow and kept the project intentionally lightweight so it can slot into broader spatial pipelines.",
      architecture: [
        "Provisioned Docker-based local geocoding services",
        "Configured PostgreSQL and PostGIS for map data workflows",
        "Simplified repeatable local setup for experimentation"
      ],
      techStack: ["Docker", "Nominatim", "PostgreSQL", "PostGIS", "OpenStreetMap"],
      results: [
        "Reduced environment setup friction for local geospatial work",
        "Created a reusable utility project that supports future mapping systems"
      ],
      images: [
        {
          src: "",
          alt: "Nominatim utility project placeholder",
          label: "Utility build",
          description: "A smaller infrastructure-focused project that stays lightweight in the portfolio."
        }
      ],
      githubUrl: githubProfile,
      expandable: false
    }
  ],
  stackGroups: [
    {
      title: "Programming & Core Engineering",
      items: ["Python", "Java", "Node.js", "SQL", "C++", "Distributed Systems", "System Design", "Concurrency", "Multithreading"]
    },
    {
      title: "Machine Learning & Deep Learning",
      items: ["PyTorch", "Scikit-learn", "XGBoost", "Transformer Models", "Hugging Face", "PEFT", "LLMs", "Fine-Tuning (LoRA, RLHF)", "INT8 Quantization", "Time-Series Forecasting", "DeepAR", "GluonTS", "Feature Engineering", "Model Evaluation"]
    },
    {
      title: "Generative AI & Agentic AI Systems",
      items: ["RAG", "LangGraph", "LangChain", "LlamaIndex", "AI Agents", "Tool Calling", "Structured Outputs", "RAGAS", "Offline Evaluation", "Hallucination Reduction"]
    },
    {
      title: "Search, Retrieval & Vector Databases",
      items: ["Semantic Search", "Hybrid Retrieval (BM25 + Dense)", "Cross-Encoder Reranking", "FAISS", "Elasticsearch", "Information Retrieval", "Search Relevance", "Inverted Indexes", "Dense Embeddings", "Vector Search"]
    },
    {
      title: "Backend & Distributed Systems",
      items: ["FastAPI", "REST APIs", "gRPC", "Microservices", "Distributed APIs", "Backend Engineering", "Event-Driven Systems", "Real-Time Systems", "Asynchronous Processing", "API Integration"]
    },
    {
      title: "Data Engineering & Streaming Pipelines",
      items: ["Apache Spark", "PySpark", "Apache Kafka", "Airflow", "ETL Pipelines", "Data Processing", "Streaming Pipelines", "Workflow Orchestration", "Redis", "PostgreSQL", "DynamoDB", "Real-Time Data Ingestion"]
    },
    {
      title: "MLOps, Cloud & Infrastructure",
      items: ["AWS", "EC2", "S3", "EMR", "SageMaker", "Lambda", "EKS", "Docker", "Kubernetes", "CI/CD", "Prometheus", "Grafana", "CloudWatch", "MLflow", "Weights & Biases", "vLLM", "Triton Inference Server", "DeepSpeed", "CUDA"]
    }
  ]
};
