import { Rocket } from 'lucide-react'
import { EmptyState, Panel } from '../components/ui'

export default function DeploymentBoard() {
  return (
    <Panel code="DEP" title="Deployment board" bodyClass="p-0">
      <EmptyState icon={Rocket} headline="No active deployments">
        Internships, contract work and program roles get posted here when they open. Nothing is
        crewing up right now — check the mission board for fuel in the meantime.
      </EmptyState>
    </Panel>
  )
}
