import { formatDateMDY } from "../utils/formatDate.js";
import { createElement } from "../utils/dom.js";

async function loadProjects() {
    const container = document.querySelector(".projects-container");

    if (!container) {
        return;
    }

    try {
        const response = await fetch("/src/data/projects.json");

        if (!response.ok) {
            throw new Error(
                `Failed to load projects: HTTP ${response.status}`
            );
        }

        const projects = await response.json();

        const sortedProjects = [...projects].sort(
            (firstProject, secondProject) =>
                secondProject.created.localeCompare(firstProject.created)
        );

        const fragment = document.createDocumentFragment();

        for (const project of sortedProjects) {
            const projectTags = (project.tags ?? []).map(tag =>
                createElement("span", {
                    class: "project-tag",
                    text: tag
                })
            );

            if (project.status) {
                projectTags.push(
                    createElement("span", {
                        class: "project-tag project-status",
                        text: `Status: ${project.status}`
                    })
                );
            }

            const projectCard = createElement(
                "a",
                {
                    class: "project-card searchable",
                    href: project.link
                },
                [
                    createElement("img", {
                        class: "project-image",
                        src: project.image,
                        alt: project.title,
                        loading: "lazy",
                        decoding: "async"
                    }),

                    createElement(
                        "div",
                        {
                            class: "project-text"
                        },
                        [
                            createElement("div", {
                                class: "project-title",
                                text: project.title
                            }),

                            createElement("div", {
                                class: "project-description",
                                html: project.description
                            }),

                            createElement(
                                "div",
                                {
                                    class: "project-meta"
                                },
                                [
                                    createElement("time", {
                                        class: "project-date",
                                        datetime: project.created,
                                        text: `Created: ${formatDateMDY(project.created)}`
                                    }),

                                    createElement(
                                        "div",
                                        {
                                            class: "project-tags"
                                        },
                                        projectTags
                                    )
                                ]
                            )
                        ]
                    )
                ]
            );

            fragment.appendChild(projectCard);
        }

        container.appendChild(fragment);
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
}

document.addEventListener("pageLoaded", loadProjects);