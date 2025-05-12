document.addEventListener('DOMContentLoaded', () => {
    // --- Deployment Path Helper Quiz Logic ---
    const quizContainer = document.getElementById('helper-quiz-container');
    const recommendationDiv = document.getElementById('helper-recommendation');

    const quizQuestions = [
        {
            id: 'appComplexity',
            question: "What's the primary nature of your application's backend tasks?",
            options: [
                { text: "Standard text generation/interaction (e.g., chatbot, basic Q&A, text analysis)", value: "standard_text" },
                { text: "Resource-intensive tasks (e.g., backend image/audio/video processing it performs itself, complex simulations, very large data handling by the backend)", value: "resource_intensive" }
            ]
        },
        {
            id: 'technicalComfort',
            question: "Your comfort with command-line interfaces (CLI), Docker, and basic server concepts?",
            options: [
                { text: "Beginner: Prefer graphical interfaces and the simplest possible deployment.", value: "beginner" },
                { text: "Intermediate: Okay with some CLI work following guides, can grasp Docker basics.", value: "intermediate" },
                { text: "Advanced: Confident managing server environments, Docker, and complex configurations.", value: "advanced" }
            ]
        },
        {
            id: 'scaleAndCost',
            question: "What are your primary considerations for scale and cost?",
            options: [
                { text: "Small experiment/prototype, lowest possible cost (free/hobby tier ideal), minimal traffic expected.", value: "small_free" },
                { text: "Small to medium study, predictable traffic, ease of use is a high priority.", value: "medium_ease" },
                { text: "Potentially spiky/unpredictable traffic, want to pay only for usage (scale-to-zero is attractive).", value: "spiky_payg" },
                { text: "Larger scale, expecting consistent traffic, performance and reliability are key.", value: "large_performance" }
            ],
        }
    ];

    let currentQuizQuestionIndex = 0;
    const userAnswers = {};

    function renderQuizQuestion() {
        if (!quizContainer) return;
        quizContainer.innerHTML = '';

        while (currentQuizQuestionIndex < quizQuestions.length &&
               quizQuestions[currentQuizQuestionIndex].condition &&
               !quizQuestions[currentQuizQuestionIndex].condition(userAnswers)) {
            currentQuizQuestionIndex++;
        }

        if (currentQuizQuestionIndex >= quizQuestions.length) {
            showRecommendation();
            return;
        }

        const q = quizQuestions[currentQuizQuestionIndex];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.options.forEach(opt => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = q.id;
            radio.value = opt.value;
            radio.onchange = handleQuizAnswer;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${opt.text}`));
            questionDiv.appendChild(label);
        });
        quizContainer.appendChild(questionDiv);
    }

    function handleQuizAnswer(event) {
        userAnswers[event.target.name] = event.target.value;
        currentQuizQuestionIndex++;
        renderQuizQuestion();
    }

    function showRecommendation() {
        if (!recommendationDiv) return;

        let htmlOutput = "<h3>Our Deployment Recommendations Based on Your Answers:</h3>";
        const answers = userAnswers;
        let primaryRecs = [];
        let secondaryRecs = [];

        if (answers.appComplexity === 'standard_text') {
            if (answers.technicalComfort === 'beginner') {
                primaryRecs.push({
                    name: "Platform-as-a-Service (PaaS)",
                    detailsHtml: "<p><strong>Examples:</strong> Heroku, DigitalOcean App Platform, Render.</p><p><strong>Why:</strong> These are generally the easiest to get started with. You connect your code (often via Git) and the platform handles servers, OS, and much of the deployment complexity. Ideal for focusing on your app code.</p><p><strong>Considerations:</strong> Review current pricing for free/hobby tiers. Heroku is a classic example of PaaS simplicity. Others like DigitalOcean App Platform also offer excellent ease of use.</p>",
                    anchor: "#section-paas"
                });
                if (answers.scaleAndCost === 'spiky_payg' || answers.scaleAndCost === 'medium_ease') {
                     secondaryRecs.push({
                        name: "Google Cloud Run (Deploy from Source/Buildpacks)",
                        detailsHtml: "<p><strong>Why:</strong> If PaaS pricing is a concern or you need very good pay-per-use scaling (including to zero for idle times), Cloud Run can build and deploy your source code directly using Google's Buildpacks. This is similar to PaaS but within the more scalable GCP ecosystem.</p><p><strong>Considerations:</strong> Involves slightly more setup within Google Cloud. Buildpacks abstract Docker initially, but understanding containers is beneficial long-term.</p>",
                        anchor: "#section-gcr"
                    });
                }
            } else if (answers.technicalComfort === 'intermediate') {
                primaryRecs.push({
                    name: "Google Cloud Run (with Docker)",
                    detailsHtml: "<p><strong>Why:</strong> Offers an excellent balance of scalability (including scale-to-zero for cost efficiency), control (via Docker for reproducible environments), and integration with other Google Cloud services. Highly recommended if you're comfortable with Docker basics.</p><p><strong>Considerations:</strong> Requires creating and managing a <code>Dockerfile</code>. The initial GCP setup might be more involved than simpler PaaS, but offers more power.</p>",
                    anchor: "#section-gcr"
                });
                secondaryRecs.push({
                    name: "Platform-as-a-Service (PaaS)",
                    detailsHtml: "<p><strong>Examples:</strong> Heroku, DigitalOcean App Platform.</p><p><strong>Why:</strong> Still a great option for simplicity and rapid deployment if you prefer to avoid Dockerfiles or are already familiar with a specific PaaS.</p><p><strong>Considerations:</strong> Evaluate cost at scale versus Cloud Run's pay-per-use model. Can be faster to get an initial version online.</p>",
                    anchor: "#section-paas"
                });
                if (answers.scaleAndCost === 'spiky_payg' || answers.scaleAndCost === 'large_performance') {
                    secondaryRecs.push({
                        name: "Function-as-a-Service (FaaS)",
                        detailsHtml: "<p><strong>Examples:</strong> AWS Lambda + API Gateway, Google Cloud Functions.</p><p><strong>Why:</strong> For highly event-driven apps or if aiming for granular pay-per-use with massive scalability for specific backend functions (rather than a monolithic Flask app).</p><p><strong>Considerations:</strong> Steeper learning curve. Packaging full Flask apps for these platforms typically requires wrappers or frameworks like AWS SAM/Chalice, or the Lambda Web Adapter.</p>",
                        anchor: "#section-faas"
                    });
                }
            } else { // Advanced for standard_text
                primaryRecs.push({
                    name: "Google Cloud Run (with Docker)",
                    detailsHtml: "<p><strong>Why:</strong> The default choice for most advanced needs with web apps. Provides robust, scalable, serverless container hosting with full control over the environment via Docker.</p>",
                    anchor: "#section-gcr"
                });
                secondaryRecs.push({
                    name: "Function-as-a-Service (FaaS)",
                    detailsHtml: "<p><strong>Examples:</strong> AWS Lambda + API Gateway, Google Cloud Functions.</p><p><strong>Why:</strong> Optimal if your backend can be structured as individual, event-driven functions (microservices) for extreme scalability and fine-grained cost control for individual functions of your backend.</p><p><strong>Considerations:</strong> Consider if your Flask app is better suited as a single service (Cloud Run) or can be broken down into functions.</p>",
                    anchor: "#section-faas"
                });
                 secondaryRecs.push({
                    name: "Infrastructure-as-a-Service (IaaS) with Docker",
                     detailsHtml: "<p><strong>Examples:</strong> DigitalOcean Droplets, AWS EC2, Google Compute Engine.</p><p><strong>Why:</strong> If you need deep OS-level control or specific server configurations not available on PaaS/Serverless, for your text app (less common need).</p><p><strong>Considerations:</strong> Highest operational overhead. Usually overkill unless specific control is paramount.</p>",
                    anchor: "#section-iaas"
                });
            }
        } else if (answers.appComplexity === 'resource_intensive') {
            if (answers.technicalComfort === 'beginner') {
                primaryRecs.push({
                    name: "Google Cloud Run (with Docker & Higher Resources)",
                    detailsHtml: "<p><strong>Why:</strong> Cloud Run can be configured with more CPU/memory. While Docker is involved, and this path is more challenging for beginners, it's often simpler and more managed than full IaaS. Your Flask app itself might not be the bottleneck if it's just calling external GenAI APIs.</p><p><strong>Considerations:</strong> Seek help with Dockerfile optimization if needed. Cost can increase with higher resources. If \"resource-intensive\" truly means your *backend itself* does heavy processing (not just the external AI), this path is still tough for beginners. Consider if tasks can be offloaded to managed cloud services.</p>",
                    anchor: "#section-gcr"
                });
                secondaryRecs.push({
                    name: "Simpler PaaS (with caution for resource needs)",
                    detailsHtml: "<p><strong>Examples:</strong> Heroku (Performance Dynos), DigitalOcean App Platform (Pro Tiers).</p><p><strong>Why:</strong> Some PaaS offer higher-tier plans with more resources. This maintains ease of use but might be less cost-effective or flexible than container solutions for truly intensive tasks.</p><p><strong>Considerations:</strong> Carefully evaluate if the PaaS resource limits meet your needs. Often, if backend processing is truly heavy, container solutions or IaaS are more appropriate long-term.</p>",
                    anchor: "#section-paas"
                });
            } else { // Intermediate or Advanced for resource_intensive
                primaryRecs.push({
                    name: "Infrastructure-as-a-Service (IaaS) with Docker",
                    detailsHtml: "<p><strong>Examples:</strong> DigitalOcean Droplets, AWS EC2, Google Compute Engine.</p><p><strong>Why:</strong> Provides maximum control over the server environment, resource allocation (CPU, RAM, potentially GPUs if your *backend itself* needs them), and software stack. Essential if PaaS/Serverless options cannot meet resource demands or offer needed control. The methodological paper's image showcase used DigitalOcean (IaaS), demonstrating its utility for complex needs.</p><p><strong>Considerations:</strong> Highest operational overhead (setup, security, maintenance, scaling). You are responsible for everything.</p>",
                    anchor: "#section-iaas"
                });
                secondaryRecs.push({
                    name: "Google Cloud Run (with Docker & Maximum Configurable Resources)",
                    detailsHtml: "<p><strong>Why:</strong> Push Cloud Run to its limits for CPU/memory. It's still serverless, reducing some management overhead compared to IaaS, but offers less fine-grained hardware control than a dedicated VM.</p><p><strong>Considerations:</strong> Verify if Cloud Run's maximum allocatable resources are sufficient for your specific intensive tasks.</p>",
                    anchor: "#section-gcr"
                });
            }
        }


        if (primaryRecs.length === 0 && secondaryRecs.length === 0) {
            htmlOutput += "<p>Please answer all questions to receive a deployment recommendation. You can also explore all options in the Table of Contents below.</p>";
        } else {
            htmlOutput += "<h4>Primary Recommendation(s):</h4>";
            primaryRecs.forEach(rec => {
                htmlOutput += `
                    <div class="recommendation-card">
                        <h5>${rec.name}</h5>
                        ${rec.detailsHtml}
                        <a href="${rec.anchor}" class="button-link">Go to ${rec.name.split('(')[0].trim()} Guide</a>
                    </div>`;
            });
            if (secondaryRecs.length > 0) {
                 htmlOutput += "<h5 style='margin-top: 25px; font-weight: bold; border-top: 1px solid #eee; padding-top:15px;'>You Might Also Consider:</h5>";
                 secondaryRecs.forEach(rec => {
                    htmlOutput += `
                        <div class="recommendation-card secondary">
                            <h5>${rec.name}</h5>
                             ${rec.detailsHtml}
                            <a href="${rec.anchor}" class="button-link">View ${rec.name.split('(')[0].trim()} Guide</a>
                        </div>`;
                });
            }
        }

        htmlOutput += `<hr style="margin-top: 25px; margin-bottom: 15px;"><p style="text-align:center; font-size:0.9em;">Remember, these are suggestions. You can explore all options in the <a href="#table-of-contents">Full Guide Table of Contents</a> below.</p>`;
        recommendationDiv.innerHTML = htmlOutput;
        recommendationDiv.style.display = 'block';
        if (quizContainer) quizContainer.style.display = 'none';
    }

    // --- Smooth Scrolling & Toggle Logic ---
    const tocLinks = document.querySelectorAll('#table-of-contents a[href^="#"]');
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight + 30 : 70; // Increased offset slightly

    tocLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    const backToTopLinks = document.querySelectorAll('a.back-to-top');
    backToTopLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                 targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // CORRECTED TOGGLE FUNCTIONALITY
    const questionTitles = document.querySelectorAll('.question-block .question-title');
    questionTitles.forEach(title => {
        // Ensure the .answer-guidance div is initially hidden if it's meant to be.
        // The HTML sets style="display: none;" which is good.

        title.addEventListener('click', () => {
            const answerDiv = title.nextElementSibling;
            const toggleIcon = title.querySelector('.toggle-icon');

            if (answerDiv && answerDiv.classList.contains('answer-guidance')) {
                // Check current computed style OR a class that indicates visibility
                const isCurrentlyHidden = answerDiv.style.display === "none" || getComputedStyle(answerDiv).display === "none";

                if (isCurrentlyHidden) {
                    answerDiv.style.display = 'block'; // Or remove a 'hidden' class
                    title.classList.add('active');
                    if (toggleIcon) toggleIcon.textContent = '[-]';
                } else {
                    answerDiv.style.display = 'none'; // Or add a 'hidden' class
                    title.classList.remove('active');
                    if (toggleIcon) toggleIcon.textContent = '[+]';
                }
            }
        });

        title.setAttribute('tabindex', '0'); // Make focusable for keyboard
        title.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent page scroll on Spacebar
                title.click(); // Trigger the click handler defined above
            }
        });
    });

    // --- Initialize Quiz ---
    if (quizContainer) {
        renderQuizQuestion();
    } else {
        console.log("Deployment Guide Initialized (no quiz container found for helper).");
    }
});