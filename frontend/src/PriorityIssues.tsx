import data from './data/priority-issues.json'
import './PriorityIssues.css'

const JIRA_BASE_URL = 'https://guaitel.atlassian.net/browse'

function PriorityIssues() {
  return (
    <section id="priority-issues">
      <h2>Tiquets prioritarios en Jira</h2>
      <ul>
        {data.issues.map((issue) => (
          <li key={issue.key}>
            <a href={`${JIRA_BASE_URL}/${issue.key}`} target="_blank">
              <span className="issue-key">{issue.key}</span>
              <span className="issue-summary">{issue.summary}</span>
            </a>
            <span className="issue-meta">
              <span
                className={`badge priority-${(issue.priority ?? 'none').toLowerCase()}`}
              >
                {issue.priority ?? 'Sin prioridad'}
              </span>
              <span className="badge">{issue.status}</span>
              <span>{issue.assignee ?? 'Sin asignar'}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="issue-footnote">
        Proyecto FLOW · actualizado el {data.fetchedAt}
      </p>
    </section>
  )
}

export default PriorityIssues
