let data = {
    projects: [
        /*{
            name: "The Lifetime Contract",
            year: 2023,
            logline: "My lifelong binding contract",
            role: "fool",
            tags: ["art"],
            headerImageURL: "",
            page: [
                {
                    element: 'p',
                    text: '<i>The Lifetime Contract</i> is a binding agreement I signed with myself to create an indefinite series of works beginning with my game <a href="index.html?p=How+To+Be+Born"><i>How To Be Born</i></a>, with a contractual obligation that I release each game in the series with a funding goal that when met obligates me to make its sequel, for the rest of my life.'
                },
                {
                    element: 'p',
                    text: 'The contract starts with <i>How To Be Born</i> because it represents both a really fun and freeing development process and also an interesting design style, along with being a thematically appropriate beginning to a lifelong series. I considered having some throughline constraint that each entry must adhere to, but the idea of having a lifelong constraint seems ill-advised'
                },
                {
                    element: 'p',
                    text: 'This project is inspired by <a href="https://www.ndbooks.com/book/the-complete-stories/">The Complete Stories of Clarice Lispector</a>, a collection of short stories written across decades throughout Lispector\'s life which when compiled reads like a fictional representation of a lifetime of shifting perspective and values. I\'m compelled by the idea of an intentional series of work that reflects my shifting style and aesthetics, peppering my other work throughout my career.'
                }
            ]
        },*/
        {
            name: "GAMER POTLUCK",
            year: 2023,
            logline: "Weekly livestream playing curated games",
            role: "co-host",
            tags: ['streaming', 'selected'],
            headerImageURL: "media/potluck header.png",
            page: [
                {
                    element: 'p',
                    text: 'Since 2021, every Monday I stream a collection of games with my friend <a href="https://mut.media">Moochi</a>, each of us curating a few games for the other to play. It\'s a great way to play lots of games either of us would never usually play, and a great reason to talk game designer each week.'
                },
                {
                    element: 'p',
                    text: 'You can watch all of the VODs <a href="twitch.tv/hawkdanny/videos">here.</a>'
                }
            ]
        },
        {
            name: "Bird Town",
            year: 2023,
            logline: "A comedy video game about a town of birds",
            role: "developer, designer, art director",
            tags: ['video game', 'selected'],
            headerImageURL: "media/homepage/birdtown_homepage.png",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/J6_313EJJb0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: "Bird Town is a comedy video game about a town of birds where you play as Margo in the final 15 minutes of her town's summer festival. Each playthrough of the game is a real time fifteen minutes where you decide how to spend your day, whether its getting into hijinks or talking with neighbors, going on bite sized adventures or taking a nap. It's your day and you can do whatever you want."
                }
            ]
        },
        {
            name: "Good Sex",
            year: 2022,
            logline: "\"Oh yeah, that's it. Keep doing what you're doing.\"",
            role: "creator",
            tags: ['video game'],
            headerImageURL: "media/homepage/goodsex_homepage.png",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/AQ1MWlxuarA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'In <i>Good Sex</i> you stand back to back with a partner, each of you holding a controller. When your partner interacts with their analog stick correctly your controller vibrates, and vice versa. And then through the power of a couple of words banned from being said out loud ("vibrate," "joystick"), you\'ve got quite a sexy game.'
                },
                {
                    element: 'p',
                    text: 'It\'s fun to appropriate xbox controllers from their usual game context via sexy theming, but also through the mechanics of the game. As the game progresses and players\' focus intensifies on their singular analog stick, they\'ll often need to reposition their grip on the controller, or use both hands to explore the possible options, maybe switch their grip as they get tired, using different fingers, etc. Approaching the controller as an object and not as a convention laden tool frees more video game familiar players to stop trying to game the system and begin communicating with their partners.'
                },
                {
                    element: 'p',
                    text: 'Showcased at <a href="https://www.wonderville.nyc/events/love-me-play-me-2-17">Wonderville</a> on February 17th, 2022'
                }
            ]
        },
        {
            name: "Social Media Games, Play and Make",
            year: 2021,
            logline: "How to create tiktok games",
            role: "co-speaker",
            tags: ['talk'],
            headerImageURL: "media/tiktok dodge.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Folk Game TikToks",
            year: 2021,
            logline: "In conversation with Now Play This",
            role: "speaker",
            tags: ['talk'],
            headerImageURL: "media/ispy2.jpg",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/oB1wsnuzzj0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'I was approached to participate in a conversation about my <a href="https://twitter.com/HawkDanny/status/1313881230312714241?s=20">viral thread of folk game tiktoks</a> for <a href="https://nowplaythis.net/2021-festival/">Now Play This 2021</a>. Their theme that year was to explore the relationship between play, games, and the climate crisis. The show itself built toward its theme on each separate day, with later days in the schedule focusing more directly on understanding, fixing, and relating to the climate crisis. My conversation was featured on the first day, where the focus was on how fun and play exists in society, especially society that was still deeply affected by covid.'
                },
                {
                    element: 'p',
                    text: 'A fun tidbit - at some point during the conversation I played <a href="https://twitter.com/HawkDanny/status/1313882073057366016">this game</a>, let me know if you think you have a guess as to where hehehe.'
                }
            ]
        },
        {
            name: "How To Be Born",
            year: 2021,
            logline: "Downloadable interactive tutorial",
            role: "creator",
            tags: ['video game', 'selected'],
            headerImageURL: "media/htbb header.png",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/KGbTTfgkVUE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'The first game in <a href=""><i>The Lifetime Contract</i></a>, <i>How To Be Born</i> is a game where you use a controller. It has some small elements of inductive logic, inspired by <a href="https://en.wikipedia.org/wiki/Eleusis_(card_game)">Eleusis</a>.'
                },
                {
                    element: 'p',
                    text: 'Created originally for <a href="https://www.twitch.tv/videos/983399024">Nicole He\'s Birth Stream</a>'
                },
                {
                    element: 'p',
                    text: 'Written about in <a href="https://letterclub.games/2021/09/06/recognizing-play/">LETTERCLUB.GAMES</a>.'
                }
            ]
        },
        {
            name: "Itch.io Monday",
            year: 2021,
            logline: "A weekly streaming playing through experimental games from itch.io",
            role: "host",
            tags: ["streaming"],
            headerImageURL: "media/itchio monday header.jpg",
            page: [
                {
                    element: 'p',
                    text: 'I picked up streaming after a year or so of self-isolation during covid, and as a reflection of my desire to play more small and experimental games, I began streaming four games from itch.io every Monday. I would sift through the itch.io "Fresh" feed, their youtube channel, and also their featured games list to find games.'
                },
                {
                    element: 'p',
                    text: 'You can watch the collection of VODs <a href="https://www.twitch.tv/collections/vrKQBcjdpxa5Gg">here</a>.'
                }
            ]
        },
        {
            name: "Folk Games, Flash Communities, and TikTok",
            year: 2021,
            logline: "An essay on how folk games have adapted to an algorithmic world",
            role: "author",
            tags: ["writing"],
            headerImageURL: "media/homepage/newrules_homepage.png",
            page: [
                {
                    element: 'p',
                    text: 'In 2020 I was approached to contribute an essay on <a href="https://twitter.com/HawkDanny/status/1313881230312714241">my viral thread</a> of folk game tiktoks to <a href="https://newrules.website/"<i>New Rules</i></a>, a collection of writing on play and games during the first year of the pandemic compiled by Holly Gramazio. I formalized my thoughts into an essay on the structure of tiktok and how it fits with play, and in particular with folk games. There are a lot of similarities with what games work well in an algorithm with what work well teaching each other on the playground. Thank you to Holly for the wonderful editing and work that she put into this great collection.'
                },
                {
                    element: 'p',
                    text: 'You can read my full essay <a href="https://newrules.website/2021/01/12/danny-hawk-folk-games-flash-communities-and-tiktok/">here</a>.'
                }
            ]
        },
        {
            name: "Saxophone Skateboard",
            year: 2020,
            logline: "Improv jazz over falls",
            role: "composer, performer",
            tags: ["video"],
            headerImageURL: "media/homepage/sax_homepage.jpg",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Ns9mnYG6kfA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'An improv sax performance created for the final <a href="file:///C:/Users/danny/Desktop/Personal-Portfolio/index.html?p=Anything+But+Games">Anything But Games</a> that I organized.'
                }
            ]
        },
        {
            name: "Folk Game Game Jam",
            year: 2020,
            logline: "DIY folk games",
            role: "co-organizer",
            tags: ["event"],
            headerImageURL: "media/homepage/folk_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: '<a href="https://twitter.com/emilyrakoonce">Emily Koonce</a> and I organized a four hour game jam focused on playing and creating folk games.'
                },
                {
                    element: 'p',
                    text: 'We broke the session into three parts, '
                }
            ]
        },
        {
            name: "Anything But Games",
            year: 2020,
            logline: "An open mic series about everything else",
            role: "organizer",
            tags: ["event"],
            headerImageURL: "media/homepage/abg_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "New Trees",
            year: 2020,
            logline: "A story of passing time",
            role: "developer, designer, composer",
            tags: ["video game"],
            headerImageURL: "media/homepage/newtrees_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Three Tabs",
            year: 2020,
            logline: "painful productivity",
            role: "creator",
            tags: ["tool"],
            headerImageURL: "media/homepage/tabs_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Court",
            year: 2019,
            logline: "A card game for a deck of cards",
            role: "co-designer",
            tags: ["card game"],
            headerImageURL: "media/homepage/court_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Imagine",
            year: 2019,
            logline: "Think about spring",
            role: "creator",
            tags: ["video game"],
            headerImageURL: "media/homepage/imagine_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Square Up",
            year: 2019,
            logline: "An exploration in radical softness",
            role: "co-designer, programmer",
            tags: ["video game"],
            headerImageURL: "media/square up header.png",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/k52Y-yWPCIE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                }
            ]
        },
        {
            name: "Perfect Ramen",
            year: 2018,
            logline: "Cooperative chopsticks simulator",
            role: "co-creator",
            tags: ["video game"],
            headerImageURL: "media/perfect ramen header.png",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Dam It!",
            year: 2018,
            logline: "A realtime strategy party game",
            role: "co-creator",
            tags: ["board game"],
            headerImageURL: "media/damit header.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "lit.rocks",
            year: 2018,
            logline: "A collection of virtual rocks",
            role: "creator",
            tags: ["art"],
            headerImageURL: "media/homepage/rock_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Danny Hawk's Boop Game",
            year: 2018,
            logline: "The game where you share and compete",
            role: "creator",
            tags: ["video game", "physical computing"],
            headerImageURL: "media/homepage/boop2_homepage.jpg",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dJwRSW0mXaI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Beautiful Series",
            year: 2018,
            logline: "Three interactive artworks about beauty",
            role: "creator",
            tags: ["art", "physical computing"],
            headerImageURL: "media/homepage/beautiful_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Gojira",
            year: 2018,
            logline: "An interactive comparison of Godzilla (1954) and Godzilla (1956)",
            role: "creator",
            tags: ["creative code"],
            headerImageURL: "media/gojira header.png",
            page: [
                {
                    html: '<img src="media/gojira.gif" alt="gojira gif" width="665" height="491">'
                },
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Narwhal Picnic",
            year: 2017,
            logline: "Put a vive controller on your forehead",
            role: "creator",
            tags: ["video game"],
            headerImageURL: "media/homepage/narwhal_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'test test'
                },
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/mC3KTQK0pqg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'test test'
                }
            ]
        },
        {
            name: "My Dog's Eyes",
            year: 2017,
            logline: "A love letter to my favorite song",
            role: "developer and designer, song from Zammuto",
            tags: ["art", "creative code"],
            headerImageURL: "media/homepage/dog_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Boop 1",
            year: 2016,
            logline: "A competitive game where you share the spacebar",
            role: "creator",
            tags: ["video game"],
            headerImageURL: "media/boop1 header.png",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "The Death of Mr. Montague",
            year: 2016,
            logline: "A card game about making up extravagant lies",
            role: "co-designer",
            tags: ["board game"],
            headerImageURL: "media/montagueHeader2.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
        {
            name: "Switch Blade",
            year: 2015,
            logline: "My first video game",
            role: "creator",
            tags: ["video game"],
            headerImageURL: "media/switchblade header.png",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },
    ]
}