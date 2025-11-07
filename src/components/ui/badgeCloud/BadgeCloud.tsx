import React from 'react'
import Badge from '../badge/Badge'
import './BadgeCloud.modules.scss'

    const BadgeCloud: React.FC = () => {
        return (
            <div className="badgeCloud">
                <Badge color="blue">Web Design</Badge>
                <Badge color="green">Frontend Development</Badge>
                <Badge color="purple">UX/UI Design</Badge>
                <Badge color="red">Project Management</Badge>
                <Badge color="yellow">Typescript</Badge>
                <Badge color="gray">React</Badge>
                <Badge color="blue">Sass</Badge>
                <Badge color="green">Animation</Badge>
                <Badge color="purple">Accessibility</Badge>
            </div>
        )
    }

    export default BadgeCloud