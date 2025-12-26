🚀 RCE Engine
Distributed Remote Code Execution Platform
Quick Summary: A production-grade microservices platform designed to securely execute untrusted user code. Built with a "Defense-in-Depth" security model using ephemeral Docker containers, Go for high-performance orchestration, and a comprehensive observability stack.

🛠️ Tech Stack
Frontend: React 18, TypeScript, Vite, Monaco Editor

Backend: Node.js (API Gateway), Go (Execution Engine), Python (Static Analysis)

Infrastructure: Docker, Nginx (Reverse Proxy), Redis (Message Queue)

Database: MongoDB (Persistence), Redis (Caching/Queues)

Observability: Prometheus, Grafana, cAdvisor

🏗️ System Architecture
The system utilizes a distributed Producer-Consumer architecture to handle high concurrency and ensure isolation.

Shutterstock

Ingestion: Nginx routes traffic to a Node.js API Gateway which performs validation and rate limiting.

Queuing: Jobs are pushed to a Redis queue, decoupling the submission logic from execution.

Orchestration: A Go Worker consumes jobs, interfacing directly with the Docker Socket to spawn ephemeral "sibling" containers.

Analysis: A parallel Python Worker performs AST (Abstract Syntax Tree) static analysis to detect malicious patterns before/during execution.

Monitoring: Real-time metrics are scraped by Prometheus and visualized in Grafana to track container health and resource spikes.

🛡️ Key Technical Highlights
1. Defense-in-Depth Security Model
Running untrusted code is inherently dangerous. I implemented 12 distinct security layers to prevent sandbox escapes and resource exhaustion:

Network Isolation: Containers are spawned with NetworkDisabled: true to prevent external calls.

Capability Dropping: All Linux capabilities (CapDrop: ["ALL"]) are removed, and no-new-privileges is enforced.

Resource Quotas: Hard limits on RAM (128MB), CPU (0.5 cores), and PIDs (max 50) to prevent Fork Bombs.

Ephemeral Lifecycle: Containers utilize the AutoRemove flag, ensuring immediate destruction after the 5-second timeout.

2. High-Performance Orchestration (Go)
I chose Go for the execution worker due to its concurrency primitives and robust Docker SDK.

Sibling Container Pattern: Rather than Docker-in-Docker (dind), the worker communicates with the host Docker socket to spawn sibling containers, reducing overhead.

Throughput: The system processes submissions with <500ms overhead, excluding runtime.

3. Full-Stack Observability
Integrated a complete monitoring pipeline to ensure production reliability:

cAdvisor exports per-container resource usage.

Prometheus aggregates metrics (CPU spikes, memory leaks).

Grafana provides alerts for abnormal behavior (e.g., a crypto-mining attempt utilizing 100% CPU).

💻 Code Highlight: Secure Container Configuration
A snippet from the Go worker demonstrating the strict security constraints applied to every sandbox.

Go

// Container security configuration in Go
HostConfig: &container.HostConfig{
    NetworkMode:   "none",             // 1. Air-gapped isolation
    AutoRemove:    true,               // 2. Ephemeral (auto-cleanup)
    Resources: container.Resources{
        Memory:     128 * 1024 * 1024, // 3. 128MB Hard Limit
        MemorySwap: 128 * 1024 * 1024, // 4. Disable Swap
        PidsLimit:  &pidsLimit,        // 5. Prevent Fork Bombs
    },
    SecurityOpt: []string{
        "no-new-privileges",           // 6. Prevent Privilege Escalation
    },
    CapDrop: []string{"ALL"},          // 7. Drop all Linux Capabilities
}
🚧 Challenges & Solutions
Challenge: Handling Infinite Loops & Fork Bombs

Problem: Malicious users submitting while(true) or recursive fork scripts crashed the worker node by consuming all host resources.

Solution: Implemented strict PidsLimit in the Docker config and a hard 5-second timeout context in Go. If the context expires, the worker forcibly kills the container.

Challenge: Secure File Transfer

Problem: Getting code into a network-isolated container without compromising the host.

Solution: Used Docker Named Volumes. Code is written to a volume, mounted read-only to the container, and the volume is garbage-collected immediately after execution.
