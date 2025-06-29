export interface Network {
  id: string;
  name: string;
  logo: string;
  apr: number;
  status: 'active' | 'maintenance' | 'upcoming';
  color: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testnet {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'archived' | 'upcoming' | 'completed';
  startDate: string;
  endDate: string | null;
  Contributors: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
}

export const networks: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png',
    apr: 4.2,
    status: 'active',
    color: '#627EEA',
    description: ''
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/atom.png',
    apr: 15.8,
    status: 'active',
    color: '#2E3148',
    description: 'Secure ATOM staking with automatic compounding'
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/dot.png',
    apr: 13.2,
    status: 'active',
    color: '#E6007A',
    description: 'Professional DOT validator with advanced security'
  },
  {
    id: 'solana',
    name: 'Solana',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png',
    apr: 6.8,
    status: 'active',
    color: '#14F195',
    description: 'High-performance validator for the Solana network'
  },
  {
    id: 'near',
    name: 'Near',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/near.png',
    apr: 10.5,
    status: 'maintenance',
    color: '#000000',
    description: 'Secure staking infrastructure for the NEAR Protocol'
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png',
    apr: 9.3,
    status: 'active',
    color: '#E84142',
    description: 'Reliable validator service for AVAX delegators'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ada.png',
    apr: 5.1,
    status: 'active',
    color: '#0033AD',
    description: 'Stake pool operation with optimal performance'
  },
  {
    id: 'tezos',
    name: 'Tezos',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xtz.png',
    apr: 5.8,
    status: 'upcoming',
    color: '#2C7DF7',
    description: 'Reliable baker service with competitive rewards'
  },
  {
    id: 'algorand',
    name: 'Algorand',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/algo.png',
    apr: 7.2,
    status: 'active',
    color: '#000000',
    description: 'Participation node with optimal configuration'
  }
];

export const services: Service[] = [
  {
    id: 'validator-nodes',
    title: 'Validator Nodes',
    description: 'Professional validator services with high-availability infrastructure and 24/7 monitoring.',
    icon: 'server',
    features: [
      '99.9% uptime guarantee',
      'Dedicated server',
      'Slashing protection systems',
      'Real-time performance monitoring'
    ]
  },
  {
    id: 'rpc-endpoints',
    title: 'RPC Endpoints',
    description: 'High-performance RPC services for developers and applications with industry-leading reliability.',
    icon: 'globe',
    features: [
      'Load-balanced cluster architecture',
      'Low-latency global access',
      'Full archive node support',
      'WebSocket and HTTPS endpoints',
    ]
  },
  {
    id: 'node-monitoring',
    title: 'Node Monitoring',
    description: 'Comprehensive monitoring solutions for blockchain nodes with advanced alerting and reporting.',
    icon: 'activity',
    features: [
      'Real-time performance dashboards',
      'Multi-channel alert systems',
      'Historical performance analysis',
      'Network health metrics',
    ]
  },
  {
    id: 'gigantic-dashboard',
    title: 'Gigantic Dashboard',
    description: 'Advanced blockchain analytics and validator management platform with comprehensive insights.',
    icon: 'dashboard',
    features: [
      'Multi-chain explorer',
      'Voting proposals',
      'Staking with your favorite validator',
      'Claim staking reward',
    ]
  }
];

export const testnets: Testnet[] = [
  {
    id: '0g',
    name: '0G',
    logo: '/images/networks/0g.png',
    status: 'active',
    startDate: '2025-04-01',
    endDate: null,
    Contributors: [
      'N/A'
    ]
  },
  {
    id: 'masa-network',
    name: 'Masa Network',
    logo: '/images/networks/masa.png',
    status: 'completed',
    startDate: '2022-07-01',
    endDate: '2022-08-01',
    Contributors: [
      'Deployed and configured high-performance blockchain nodes',
      'Earned network participation rewards from mining operations',
      'Provided reliable technical support, ensuring minimal downtime'
    ]
  },
  {
    id: 'stride',
    name: 'Stride',
    logo: '/images/networks/stride.png',
    status: 'completed',
    startDate: '2022-07-01',
    endDate: '2022-09-01',
    Contributors: [
      'Maintained node uptime at 99.9%',
      'Operated IBC relayer channel between Stride and GAIA',
      'Executed staking, redeeming, and claiming processes, including 6-hour unbonding mechanism',
      'Implemented relayer with Go Relayer v2',
      'Facilitated interchain queries via Go Relayer v2',
      'Delegated tokens to peer validator for ecosystem participation'
    ]
  },
  {
    id: 'near',
    name: 'Near',
    logo: '/images/networks/near.png',
    status: 'completed',
    startDate: '2022-08-01',
    endDate: '2022-09-01',
    Contributors: [
      'Created wallet on Shardnet and deployed NEAR CLI',
      'Deployed and synchronized validator node via snapshot',
      'Established a dedicated staking pool',
      'Set up comprehensive node monitoring system',
      'Scheduled routine cron jobs for automated checks',
      'Implemented revenue sharing mechanism for staking rewards'
    ]
  },
  {
    id: 'aptos',
    name: 'Aptos',
    logo: '/images/networks/aptos.png',
    status: 'completed',
    startDate: '2022-07-01',
    endDate: '2022-10-01',
    Contributors: [
      'Successfully deployed and optimized Aptos validator nodes',
      'Achieved consistent 99.9% uptime for all critical infrastructure',
      'Delivered responsive technical support to maintain node health',
      'Tuned VPS configurations to improve performance and resource efficiency'
    ]
  },
  {
    id: 'autonomys',
    name: 'Autonomys (prev. Subspace)',
    logo: '/images/networks/autonomys.png',
    status: 'archived',
    startDate: '2022-09-01',
    endDate: '2022-10-01',
    Contributors: [
      'Completed full node synchronization and acquired rewards through node mining'
    ]
  },
  {
    id: 'meson-network',
    name: 'Meson Network',
    logo: '/images/networks/meson.png',
    status: 'completed',
    startDate: '2022-07-01',
    endDate: '2022-12-01',
    Contributors: [
      'Deployed high-speed node (1.4 Gbps bandwidth) to optimize network throughput',
      'Successfully tested token withdrawal functionality through Meson dashboard'
    ]
  },
  {
    id: 'sui',
    name: 'Sui',
    logo: '/images/networks/sui.png',
    status: 'completed',
    startDate: '2022-11-01',
    endDate: '2022-12-01',
    Contributors: [
      'Achieved full node synchronization without error',
      'Minted NFTs via CLI, demonstrating successful integration with network tools'
    ]
  },
  {
    id: 'massa',
    name: 'Massa',
    logo: '/images/networks/massa.png',
    status: 'completed',
    startDate: '2022-06-01',
    endDate: '2023-03-01',
    Contributors: [
      'Deployed and synchronized nodes with verified stability',
      'Generated wallet and successfully claimed faucet',
      'Earned contribution points through sustainned node operation'
    ]
  },
  {
    id: 'sei',
    name: 'Sei',
    logo: '/images/networks/sei.png',
    status: 'completed',
    startDate: '2022-06-01',
    endDate: '2023-05-01',
    Contributors: [
      'Maintained stable IBC relayer connectivity with Osmosis',
      'Sustained 99.7% node uptime',
      'Placed multi-order transactions using CLI efficiently',
      'Executed limit and market order placements via CLI to validate DEX functionality'
    ]
  },
  {
    id: 'nulink',
    name: 'NuLink',
    logo: '/images/networks/nulink.png',
    status: 'completed',
    startDate: '2024-01-01',
    endDate: '2024-05-01',
    Contributors: [
      'Achieved full synchronization with the testnet',
      'Participated in staking operations via web dashboard using own validator node'
    ]
  },
  {
    id: 'obol',
    name: 'Obol',
    logo: '/images/networks/obol.png',
    status: 'archived',
    startDate: '2023-01-01',
    endDate: '2023-01-01',
    Contributors: [
      'N/A'
    ]
  },
  {
    id: 'nolus',
    name: 'Nolus',
    logo: '/images/networks/nolus.png',
    status: 'completed',
    startDate: '2023-03-01',
    endDate: '2023-04-01',
    Contributors: [
      'Provided public RPC and gRPC endpoints to enhance accessibility',
      'Operated relayer connections between Nolus → Rila, Nolus → Osmosis, and Osmosis → Nolus',
      'Monitored network behavior and flagged anomalies using Grafana dashboard'
    ]
  },
  {
    id: 'quicksilver',
    name: 'Quicksilver',
    logo: '/images/networks/quicksilver.png',
    status: 'completed',
    startDate: '2023-03-01',
    endDate: '2023-04-01',
    Contributors: [
      'Operated a validator node on the Quicksilver chain from genesis',
      'Maintained 99.6% uptime throughout the testnet period',
      'Achieved one of the lowest missed block counts across all participants',
      'Maintained validator status without jail time throughout the entire testnet',
      'Successfully executed a node upgrade during the testnet phase',
      'Set validator commission rate at 5.9%',
      'Performed reward withdrawal and self-bonding operations',
      'Participated in governance voting and proposal creation',
      'Successfully redelegated stake from own validator to another validator'
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'cosmos-ibc-security-practices',
    title: 'IBC Protocol Security: Best Practices for Cosmos Validators',
    excerpt: 'A comprehensive guide to security best practices for validators running IBC relayers in the Cosmos ecosystem. This article covers common vulnerabilities in IBC implementations, strategies for securing relayer keys, optimal configurations to prevent replay attacks, specialized IBC monitoring systems, recovery protocols in case of security breaches, and case studies from previous IBC security incidents.',
    category: 'Security',
    date: '2024-06-30',
    readTime: 16,
    image: 'https://images.unsplash.com/photo-1614064642639-e398cf05badb?q=80&w=1470&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'cosmos-dex-comparison',
    title: 'IBC-Based DEX Comparison in the Cosmos Ecosystem 2024',
    excerpt: 'An in-depth analysis of various DEXs leveraging the IBC protocol in the Cosmos ecosystem. This article compares Osmosis, Astroport, Crescent, and other DEX implementations based on technical architecture, liquidity models, liquidity provision mechanisms, IBC implementation, security protocols, transaction volumes, and tokenomics design. Includes performance data and considerations for validators looking to participate in various DEXs.',
    category: 'Analysis',
    date: '2024-06-25',
    readTime: 14,
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1402&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'cosmos-ibc-scaling-solutions',
    title: 'IBC Scaling Solutions: The Future of Cosmos Interoperability',
    excerpt: 'A technical investigation of the latest scaling solutions for the IBC protocol in the Cosmos ecosystem. This article discusses recent implementations of IBC 2.0, new relayer integrations, protocol optimizations, advanced configuration strategies for handling high volumes, the impact of Interchain Security and Interchain Queries developments, and the technology roadmap for improving throughput and reducing latency across interchain networks.',
    category: 'Technical',
    date: '2024-06-20',
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1470&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'cosmos-sdk-development-trends',
    title: 'Cosmos SDK & IBC Development Trends in Enterprise Applications',
    excerpt: 'A comprehensive analysis of Cosmos SDK and IBC technology adoption in enterprise environments. This article explores recent use cases for Cosmos SDK in business applications, using IBC to connect enterprise blockchains with public networks, implementations in decentralized finance systems, regulatory compliance strategies, and the business advantages offered by Cosmos multi-chain architecture compared to traditional monolithic blockchain approaches.',
    category: 'Analysis',
    date: '2024-06-18',
    readTime: 17,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'liquid-staking-explained',
    title: 'Liquid Staking Explained: Benefits and Risks',
    excerpt: 'A comprehensive technical and economic examination of liquid staking protocols and their impact on capital efficiency, validator economics, and network security. Analyzes protocol-specific validator selection mechanisms, financial risks including rehypothecation and slashing correlation, DVT integration, centralization vectors, regulatory challenges under securities frameworks, and the game theory of LST markets including LRTs and restaking derivatives.',
    category: 'Education',
    date: '2024-06-08',
    readTime: 13,
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1471&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'understanding-proof-of-stake',
    title: 'Understanding Proof of Stake: The Future of Blockchain Consensus',
    excerpt: 'Dive deep into the mechanics of Proof of Stake consensus mechanisms that are transforming blockchain energy efficiency and security models. This comprehensive analysis explores economic security principles, stake-based validator selection, finality guarantees, and compares PoS implementations across Ethereum, Cosmos, Polkadot, and other leading networks.',
    category: 'Education',
    date: '2024-05-23',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'zkp-validator-integration',
    title: 'Zero-Knowledge Proofs in Validator Infrastructure',
    excerpt: 'A researcher-level exploration of zero-knowledge cryptography applications in next-generation validator infrastructure. This technical deep-dive covers ZK-SNARKs and ZK-STARKs implementation in validator privacy, performance attestations without data revelation, proofs of correct execution, succinct block validation, and interoperability use cases. Includes implementation examples with specialized hardware acceleration requirements and benchmarks for validium-based optimizations.',
    category: 'Technical',
    date: '2024-05-12',
    readTime: 18,
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1470&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'restaking-protocols-analysis',
    title: 'Restaking Protocols: The Next Evolution in Blockchain Security',
    excerpt: 'An in-depth technical and economic analysis of restaking protocols like EigenLayer, examining their revolutionary approach to security reuse across crypto networks. This technical paper investigates the mathematical models behind security pooling, risk correlation between AVSs, slashing conditions across stacked security layers, game theory implications for validators, potential centralization vectors, and the economic incentive structures reshaping blockchain security markets.',
    category: 'Analysis',
    date: '2024-04-29',
    readTime: 14,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1632&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'institutional-staking-trends',
    title: 'Institutional Staking Trends in 2024',
    excerpt: 'A data-driven market analysis of institutional capital flows into proof-of-stake networks based on comprehensive validator data and market research. This report examines the regulatory developments enabling institutional participation, custody solutions meeting institutional requirements, risk management frameworks for large-scale staking operations, the emerging validator-as-a-service (VaaS) market for institutions, governance participation patterns among institutional validators, and projected market growth based on quantitative models of institutional adoption curves.',
    category: 'Analysis',
    date: '2024-04-03',
    readTime: 14,
    image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?q=80&w=1374&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'eth2-validator-performance',
    title: 'Optimizing ETH2 Validator Performance',
    excerpt: 'An expert-level analysis of Ethereum consensus layer client performance optimization. This in-depth technical guide covers hardware benchmarks across different CPU, memory, and SSD configurations, client diversity strategies (Prysm, Lighthouse, Teku, Nimbus), MEV-boost configuration, proposer/builder separation, network topology optimization, and advanced monitoring metrics that impact validator rewards and network security.',
    category: 'Technical',
    date: '2024-03-17',
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1374&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'node-infrastructure-scaling',
    title: 'Scaling Node Infrastructure for Enterprise Clients',
    excerpt: 'A detailed system design guide for building institutional-grade validator infrastructure at scale. Covers deployment automation with Terraform/Ansible, containerization strategies using Kubernetes with custom CRDs for blockchain nodes, geographical distribution with latency optimization, zero-downtime upgrade pipelines, rate-limiting and DDoS mitigation techniques, comprehensive SLA frameworks, observability stacks, and API management for enterprise clients.',
    category: 'Technical',
    date: '2024-03-01',
    readTime: 16,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1470&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'cross-chain-staking-opportunities',
    title: 'Cross-Chain Staking: New Opportunities and Challenges',
    excerpt: 'A thorough technical and economic examination of emerging cross-chain staking protocols and their implications for validator operations. The research covers IBC-enabled stake transfers, interchain security modules, bridge-based staking solutions, trust assumptions in cross-chain mechanisms, risk correlation analysis across multiple networks, capital efficiency improvements, complex slashing condition management, and implementation challenges for validators operating across heterogeneous consensus protocols.',
    category: 'Analysis',
    date: '2024-02-25',
    readTime: 13,
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'validator-security-best-practices',
    title: 'Validator Security Best Practices in 2024',
    excerpt: 'A deep technical guide to securing validator infrastructure against sophisticated attacks. Learn advanced key management strategies using HSMs, secure enclave technologies, multi-party computation (MPC), network isolation architecture, defense-in-depth principles, and incident response protocols. Includes case studies of recent validator security breaches and mitigation strategies.',
    category: 'Security',
    date: '2024-02-10',
    readTime: 14,
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1470&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'cosmos-ecosystem-growth',
    title: 'The Explosive Growth of the Cosmos Ecosystem',
    excerpt: 'A data-driven analysis of the Cosmos ecosystem\'s exponential growth metrics across IBC transaction volumes, TVL, validator distributions, and cross-chain infrastructure development. Examines the network effects of sovereign app-chains, interchain security, economic alignment through interchain accounts, and validator business opportunities in specialized application chains from DeFi to AI oracles and RWA infrastructure.',
    category: 'Analysis',
    date: '2024-01-05',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1472&auto=format&fit=crop',
    featured: false
  }
];