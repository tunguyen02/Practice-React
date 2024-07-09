import { useState } from "react";

import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

    const [projectsState, setProjectState] = useState({
        selectedProjectID: undefined,
        projects: [],
        tasks: []
    });

    const handleAddTask = (text) => {
        setProjectState(prevState => {
            const taskId = Math.random();
            const newTask = {
                id: taskId,
                text: text,
                projectId: prevState.selectedProjectID
            };
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask]
            }
        });
    }

    const handleDeleteTask = (id) => {
        setProjectState(prevState => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(task => task.id !== id)
            }
        });
    }

    const handleSelectProject = (id) => {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: id
            }
        });
    }

    const handleStartAddProject = () => {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: null
            }
        });
    }

    const handleCancelAddProject = () => {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: undefined
            }
        });
    }

    const handleAddProject = (projectData) => {
        setProjectState(prevSate => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            };
            return {
                ...prevSate,
                selectedProjectID: undefined,
                projects: [...prevSate.projects, newProject],
            }
        })

    }

    console.log(projectsState);

    const handleDeleteProject = (id) => {
        setProjectState(prevState => {
            return {
                ...prevState,
                selectedProjectID: undefined,
                projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectID)
            }
        });
    }

    const selectedProject = projectsState.projects.find(
        project => project.id === projectsState.selectedProjectID);

    let content = <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks}
    />;

    if (projectsState.selectedProjectID === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    } else if (projectsState.selectedProjectID === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />

    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectProjectId={projectsState.selectedProjectID}
            />
            {content}
        </main>
    );
}

export default App;
