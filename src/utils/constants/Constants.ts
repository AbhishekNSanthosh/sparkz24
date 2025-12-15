import { Event } from "@/utils/types/event";

export const navItems = [
    {
        title:"Home",
        to:"/"
    },
    {
        title: "Events",
        to: "/events"
    },
    {
        title: "About",
        to: "/#about"
    },
    {
        title:"Contact",
        to: "/contact"
    },
    
]

export const events: Event[] = [
    {
        id: 1,
        title: "RoboWars",
        department: "ECE",
        description:
            "Build and battle your own robot in an intense arena showdown!",
        prize: "₹50,000",
        date: "Jan 16",
        eventType: "Competitive",
        imageUrl: "/event.png",
    },
    {
        id: 2,
        title: "CodeBlitz Hackathon",
        department: "CSE",
        description: "48-hour coding marathon – solve real problems, win big!",
        prize: "₹40,000",
        eventType: "Competitive",
        date: "Jan 16–17",
        imageUrl: "/event.png",
    },
    {
        id: 3,
        title: "Drone Racing",
        department: "MECH",
        description:
            "Fly custom drones through insane obstacle courses at lightning speed.",
        prize: "₹30,000",
        eventType: "Competitive",
        date: "Jan 17",
        imageUrl: "/event.png",
    },
    {
        id: 4,
        title: "Circuit Master",
        department: "ECE",
        description:
            "Design and prototype innovative electronic circuits on the spot.",
        prize: "₹25,000",
        eventType: "Competitive",
        date: "Jan 16",
        imageUrl: "/event.png",
    },
    {
        id: 5,
        title: "AI Challenge",
        department: "CSE",
        description: "Build smart ML models to tackle fun real-world problems.",
        prize: "₹35,000",
        eventType: "Competitive",
        date: "Jan 17",
        imageUrl: "/event.png",
    },
    {
        id: 6,
        title: "CAD Clash",
        department: "MECH",
        description:
            "3D modeling battle – design the coolest mechanical prototype!",
        prize: "₹20,000",
        eventType: "Competitive",
        date: "Jan 16",
        imageUrl: "/event.png",
    },
    {
        id: 7,
        title: "Cyber CTF",
        department: "CSE",
        description:
            "Capture the Flag hacking competition – find vulnerabilities, score points!",
        prize: "₹45,000",
        eventType: "Competitive",
        date: "Jan 17",
        imageUrl: "/event.png",
    },
];

export const departments = ["All", "CSE", "ECE", "MECH"];
