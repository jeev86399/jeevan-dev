import { projects, categories } from '../data/projects'

export const getProjectById = (id) => projects.find((p) => p.id === id)

export const getProjectsByCategory = (category) =>
  category === 'All' ? projects : projects.filter((p) => p.category === category)

export const getFeaturedProjects = () => projects.slice(0, 3)

export { categories }