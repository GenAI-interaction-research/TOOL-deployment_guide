# GenAI Research App - Deployment Guide

This interactive guide is designed to help researchers, particularly those with limited DevOps experience, navigate the process of deploying Python/Flask backend applications for their Generative AI (GenAI) studies. It complements the methodological paper: ["Building GenAI-Driven Web Applications to Study USER-GenAI Interaction"](https://github.com/GenAI-interaction-research/.github).

**Access the Live Deployment Guide:** [https://genai-interaction-research.github.io/TOOL-deployment_guide]

## Features

* **Interactive Deployment Path Helper:** An initial quiz to help you identify suitable deployment platforms based on your application's complexity, your technical comfort level, and scale/cost considerations.
* **Comprehensive Content:** Covers key decision points outlined in Table 2 of the associated methodological paper.
* **Platform-Specific Guidance:** Provides structured, (placeholder) step-by-step instructions for deploying to:
    * Platform-as-a-Service (PaaS) providers (with Heroku as a detailed example, and discussion of others like DigitalOcean App Platform).
    * Google Cloud Run (for containerized, serverless deployments).
    * Function-as-a-Service (FaaS) like AWS Lambda + API Gateway or Google Cloud Functions (conceptual overview).
    * Infrastructure-as-a-Service (IaaS) using Docker (conceptual overview).
* **Prerequisites Covered:** Details essential pre-deployment steps like managing `requirements.txt`, using a WSGI server (Gunicorn), understanding `Procfile` and `Dockerfile`, secure environment variable management, and version control with Git.
* **Dockerization Deep Dive:** Explains the benefits of Docker and provides an example `Dockerfile` for Flask applications.
* **User-Friendly Interface:**
    * Single-page layout for easy navigation and searching.
    * Table of Contents with smooth-scrolling links.
    * Collapsible sections for detailed information, allowing users to focus on relevant topics.
* **External Resources:** Includes links to official documentation, helpful tools, and the main research paper.
* **Focus on Researchers:** Language and explanations are tailored to be accessible, even with limited prior deployment experience.

## How to Use This Guide

1.  **Open (https://genai-interaction-research.github.io/TOOL-deployment_guide) in your browser.**
2.  **Start with the "Find Your Deployment Path" quiz:** Answer the questions to get personalized recommendations for which deployment platform(s) might be the best fit for your project.
3.  **Navigate the Guide:**
    * Use the recommendations from the quiz to jump to specific platform guides.
    * Alternatively, use the Table of Contents to explore any section of interest.
4.  **Expand Sections:** Click on any question or topic heading (e.g., "3.1. Heroku Account & CLI Setup `[+]`") to reveal detailed instructions and explanations. Click again to collapse.
5.  **Follow Instructions:** For your chosen platform, follow the step-by-step guidance. Remember to fill in specific details (like your actual API keys, project names, etc.) as you go.
6.  **Consult External Links:** The guide provides links to official documentation and other resources for more in-depth information. Platform documentation is always the most current source for specific commands and features.

## Structure of the Guide (HTML/CSS/JS Files)

This guide is a static web application built with:

* `index.html`: Contains the main structure and all the textual content of the guide.
* `style.css`: Provides the visual styling for readability and interactivity.
* `script.js`: Handles the "Deployment Path Helper" quiz logic, smooth scrolling for the Table of Contents, and the expand/collapse functionality for content sections.

## Contributing & Filling Content

This guide is a starting framework. The detailed step-by-step content within many of the collapsible `.answer-guidance` sections (especially for specific platform deployment procedures) is currently at a placeholder or summary level.

**We welcome contributions to expand and refine this content!** If you have expertise in deploying Flask applications to Heroku, Google Cloud Run, AWS, DigitalOcean, or other platforms, please consider contributing more detailed instructions, command examples, and troubleshooting tips.

**To contribute:**

1.  Fork this repository.
2.  Edit the `index.html` file to add or update content within the relevant `<div class="answer-guidance">...</div>` sections.
3.  If adding new major sections, update the Table of Contents in `index.html` and ensure the `id` attributes match for linking.
4.  Test your changes locally by opening `index.html` in a browser.
5.  Submit a Pull Request with your suggested changes.

## Related Resources

* **Methodological Paper:** ["Building GenAI-Driven Web Applications to Study USER-GenAI Interaction"](https://github.com/GenAI-interaction-research/.github)
* **Tool to guide overall design decisions for GenAI driven web applications:** [https://genai-interaction-research.github.io/TOOL-decision_tree](https://genai-interaction-research.github.io/TOOL-decision_tree)
* **GenAI Script Snippet Generator:** [https://genai-interaction-research.github.io/TOOL-script_generator/](https://genai-interaction-research.github.io/TOOL-script_generator/)
* **Main GitHub Organization:** [https://github.com/GenAI-interaction-research](https://github.com/GenAI-interaction-research)

## Feedback

If you have feedback, find issues, or have suggestions for improving this guide, please [open an issue](https://github.com/GenAI-interaction-research/YOUR_DEPLOYMENT_GUIDE_REPO_NAME/issues) in this repository. 

---
