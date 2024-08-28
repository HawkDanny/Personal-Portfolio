let data = {
    projects: [
        /*{
            name: "The Lifetime Contract",
            year: 2023,
            logline: "My lifelong binding contract",
            role: "fool",
            tags: ['art', 'selected'],
            headerImageURL: "https://www.employmentandlaborlawblog.com/wp-content/uploads/sites/566/2018/08/shutterstock_310318895.jpg",
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
                    text: 'This project is inspired by Zach Gage\'s <a href="http://www.stfj.net/duel/">Duel</a>, and also by <a href="https://www.ndbooks.com/book/the-complete-stories/">The Complete Stories of Clarice Lispector</a>, a collection of short stories written across decades throughout Lispector\'s life which when compiled reads like a fictional representation of a lifetime of shifting perspective and values. I\'m compelled by the idea of an intentional series of work that reflects my shifting style and aesthetics, peppering my other work throughout my career.'
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
                    text: 'Since 2021, every Monday I stream a collection of games with my friend <a href="https://mut.media">Moochi</a>, each of us curating a few games for the other to play. It\'s a great way to play lots of games either of us would never usually play, and a great reason to talk game design each week.'
                },
                {
                    html: '<p>You can watch all of the VODs <a href="twitch.tv/hawkdanny/videos">here.</a></p>'
                }
            ]
        },
        {
            name: "Bird Town",
            year: 2023,
            logline: "A comedy video game about a town of birds",
            role: "developer, designer, art director",
            tags: ['game', 'video game', 'selected'],
            headerImageURL: "media/homepage/birdtown_homepage.png",
            page: [
                {
                    html: "<p>Bird Town is a comedy video game about a town of birds created with <a href='https://www.instagram.com/mibdoodle/'>Michelle Bao</a>. It began as my thesis at the NYU Game Center and was later selected as part of the 2021-2022 NYU Game Center Incubator. While a thesis project, it has a thematic focus on meta-modernism and the game had a 15 minute time limit. Not a time loop, but rather every playthrough of the game would provide a different story based on how you explored and interacted with the world. You can see a trailer of this version <a href='https://www.youtube.com/watch?v=SYcbyfcF9X0'>here</a>, and you can see me talk about it in my cohort's showcase <a href='https://youtu.be/YeGoQbdcmEI?t=10709'>here</a>.</p>"
                },
                {
                    html: "<p>Bird Town was later accepted into the NYU Game Center's Incubator for 2021-2022, where we grew the game to focus on the intertwined stories, dropping the 15 minute timer to allow players to play at their own pace while allowing the world to react and changed based on player action. After too long, we recognized that the design pillar of the game was comedy, and the player's movement and interaction system was overhauled to give them the tools for comedic expression. You can see a trailer of this version <a href='https://www.youtube.com/watch?v=J6_313EJJb0'>here</a>, and you can see us talk about it in the incubator showcase <a href='https://youtu.be/Kx4JR0euzeI?t=1129'>here</a>.</p>"
                },
                {
                    element: 'p',
                    text: 'Bird Town\'s development is currently on a hiatus in order to focus on other projects.'
                }
            ]
        },
        {
            name: "Good Sex",
            year: 2022,
            logline: "\"Oh yeah, that's it. Keep doing what you're doing.\"",
            role: "creator",
            tags: ['game', 'video game', 'selected'],
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
            tags: ['speaking'],
            headerImageURL: "media/tiktok dodge.jpg",
            page: [
                {
                    html: '<p>For <a href="http://www.playfestival.de/">PLAY - Creative Gaming Festival</a>, I ran a workshop with <a href="https://twitter.com/emilyrakoonce">Emily Koonce</a> on the creation and culture of social media folk games. It was an online adaptation of the work Emily and I had done creating Folk Game Game Jam, filtered through the new lens of social media games and tiktok.</p>'
                },
            ]
        },
        {
            name: "Folk Game TikToks",
            year: 2021,
            logline: "In conversation with Now Play This",
            role: "speaker",
            tags: ['speaking'],
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
            tags: ['game', 'video game', 'selected'],
            headerImageURL: "media/htbb header.png",
            page: [
                /*{
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/KGbTTfgkVUE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'The first game in <a href=""><i>The Lifetime Contract</i></a>, <i>How To Be Born</i> is a game where you use a controller. It has some small elements of inductive logic, inspired by <a href="https://en.wikipedia.org/wiki/Eleusis_(card_game)">Eleusis</a>.'
                },*/
                {
                    html: '<p>Created originally for <a href="https://www.twitch.tv/videos/983399024">Nicole He\'s Birth Stream</a>.</p>'
                },
                {
                    html: '<p>Written about in <a href="https://letterclub.games/2021/09/06/recognizing-play/">LETTERCLUB.GAMES</a>.</p>'
                },
                {
                    html: '<iframe width="552" height="167" frameborder="0" src="https://itch.io/embed/921985"><a href="https://hawkdanny.itch.io/how-to-be-born">How To Be Born by Danny Hawk</a></iframe>'
                }
            ]
        },
        {
            name: "Itch.io Monday",
            year: 2021,
            logline: "A weekly stream playing through experimental games from itch.io",
            role: "host",
            tags: ['streaming'],
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
            tags: ['writing', 'selected'],
            headerImageURL: "media/homepage/newrules_homepage.png",
            page: [
                {
                    element: 'p',
                    text: 'In 2020 I was approached to contribute an essay on <a href="https://twitter.com/HawkDanny/status/1313881230312714241">my viral thread</a> of folk game tiktoks to <a href="https://newrules.website/"<i>New Rules</i></a>, a collection of writing on play and games during the first year of the pandemic compiled by Holly Gramazio. I formalized my thoughts into an essay on the structure of tiktok and how it fits with play, and in particular with folk games. There are a lot of similarities with what games work well in an algorithm with what work well teaching each other on the playground. Thank you to Holly for the wonderful editing and work that she put into this great collection.'
                },
                {
                    html: '<p>You can read my full essay <a href="https://newrules.website/2021/01/12/danny-hawk-folk-games-flash-communities-and-tiktok/">here</a>.</p>'
                }
            ]
        },
        {
            name: "Saxophone Skateboard",
            year: 2020,
            logline: "Improv jazz over falls",
            role: "composer, performer",
            tags: ['video', 'art'],
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
            tags: ['event'],
            headerImageURL: "media/homepage/folk_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: '<a href="https://twitter.com/emilyrakoonce">Emily Koonce</a> and I organized a four hour game jam focused on playing and creating folk games. '
                },
                {
                    element: 'p',
                    text: 'We broke the session into three parts, opening with a short presentation from the two of us talking about our own relationships and understandings of folk games from the point of view of players and also designers. We offered a couple heuristics to begin thinking about the design of a good folk game, like how the rules are often explainable in a couple sentences, or that the main activity of the game is sometimes just fun in itself. A lot of folk games have rules that require no objects or tools, but have highly varied play experiences depending on where you play them.'
                },
                {
                    html: '<p>Then we pretty quickly started playing a curated itenerary of games (Chopsticks, Zen Counting, Patterns Game, Four Corners, Sardines), which was certainly a crucial element of the game jam. First to let people experience a range of different folk games, but importantly to get everyone playing and moving, building our own play community.</p>'
                },
                {
                    element: 'p',
                    text: 'We carried that play community into making games, with a process that was deeply organic and playful. Groups formed quickly but members were swapping from group to group all the time. Games were created and played, with changes to their rules happening concurrently with their play, from minute to minute games would mutate into something new through discussion or sometimes unspoken playfulness. Each attendee was probably involved in the creation of perhaps a dozen different games, and when the exploration of a game reached a natural conclusion or a lull, we would gather and play a handful of folk games that attendess knew and shared with us.'
                },
                {
                    element: 'p',
                    text: 'When planning this event, Emily and I wanted to engage with and think about the design of folk games. We were inspired by the playfulness of <a href="">ITP\'s Stupid Hackathon</a> and wanted to similarly push back on game jam culture in the way that Stupid Hackathon bucked the conventions of the usual tech hackathon. However, through the natural rhythm of play and an energetic community of attendees, we arrived somewhere much more similar to a New Games Festival, with a kind of swirling and mutating group of people playing games with increasingly little reservation. It felt like playing outside as kids and I was stunned by how easily that feeling could be created and captured. In my memory Folk Game Game Jam is a beautiful and sunny day.'
                }
            ]
        },
        {
            name: "Anything But Games",
            year: 2020,
            logline: "An open mic series about everything else",
            role: "organizer",
            tags: ['event'],
            headerImageURL: "media/homepage/abg_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'In the fall of 2019 I inherited Anything But Games from <a href="https://brendanbyrne.info/">Brendan Byrne</a> and I proceeded to organize it for my 2nd year as an mfa. Originally created as a way of getting MFAs at the NYU Game Center to share all of the interesting things they did before attending the game center, it quickly became a creative stage where people could give talks, performances, screenings, demos, and any other miscellaneous ideas. The only rule was that if you mentioned games you were booed.'
                },
                {
                    element: 'p',
                    text: 'You can find a history of Anything But Games events <a href="https://www.nyugamecenter.info/calendar-+-events/anything-but-games">here</a>'
                }
            ]
        },
        {
            name: "New Trees",
            year: 2020,
            logline: "A story of passing time",
            role: "developer, designer, composer",
            tags: ['game', 'video game'],
            headerImageURL: "media/homepage/newtrees_homepage.jpg",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7bRAxK8KvRw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'For Global Game Jam 2020, I collaborated with <a href="https://twitter.com/varunsaxena416">Varuna Saxena</a> and <a href="https://twitter.com/toby_do">Toby Do</a> with a goal of creating a tiny vignette game. We won "Best Visuals" at NYU\'s Global Game Jam site.'
                },
                {
                    html: '<iframe width="552" height="167" frameborder="0" src="https://itch.io/embed/563624"><a href="https://tobydo.itch.io/new-trees">New Trees by tobydo</a></iframe>'
                }
            ]
        },
        {
            name: "Court",
            year: 2019,
            logline: "A card game for a deck of cards",
            role: "co-designer",
            tags: ['game', 'card game'],
            headerImageURL: "media/homepage/court_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'Created with <a href="https://www.alejvilla.com/">Alejandra Villenueva</a> and <a href="https://koonce.itch.io/">Emily Koonce</a> as part of Traditional Card Games Literacy, a class taught by <a href="https://twitter.com/jessefuchs">Jesse Fuchs</a>.'
                },
                {
                    element: 'p',
                    text: 'Our design ethos for creating a game for a 52 card deck is not to make some startlingly designed game, but rather something more like a nice snack. When playing through a few dozen different reference games we found ourselves enjoying the card games that sat somewhere in the design space of easy to engage with but also easy to ignore. Card games are great for chatting with your friends over :)'
                },
                {
                    element: 'p',
                    text: 'We based Court on a misinterpretation of the rules of the game <a href="https://boardgamegeek.com/boardgame/92415/skull">Skull</a>, and then added some a betting mechanic to it.'
                },
                {
                    html: '<p>Here\'s the <a href="media/court rules.pdf">rules pdf</a>.</p>'
                }
            ]
        },
        {
            name: "Garden (2016-2019)",
            year: 2019,
            logline: "A garden of my entire camera roll",
            role: "creator",
            tags: ['game', 'video game', 'art'],
            headerImageURL: "media/homepage/garden-homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'Created as part of a Prototype Studio, a game-a-week class I took as part of my MFA at the NYU Game Center. The week\'s prompt was "Portrait," and I ended up creating a garden where you plant flowers made out of a random selection from my entire camera roll.'
                },
                {
                    element: 'p',
                    text: 'The access to everything creates a deeply personal experience that is frightening to submit myself to, but the random delivery of these pictures creates an impersonal and hard to decipher context for each.'
                },
                {
                    html: '<iframe height="167" frameborder="0" src="https://itch.io/embed/2054680" width="552"><a href="https://hawkdanny.itch.io/garden">Garden (2016-2019) by Danny Hawk</a></iframe>'
                }
            ]
        },
        {
            name: "Imagine Spring",
            year: 2019,
            logline: "Think about spring",
            role: "creator",
            tags: ['game', 'video game'],
            headerImageURL: "media/homepage/imagine_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'Created as part of a Prototype Studio, a game-a-week class I took as part of my MFA at the NYU Game Center. The week\'s prompt was "Spring," and I ended up creating a game about imagining spring.'
                },
                {
                    element: 'p',
                    text: 'I wanted to play with the idea of players closing their eyes, and what it means to be playing a game that you aren\'t actively controlling with all of the societal expectations of a video game meaning direct control. To me the game is in the continued choice to keep your eyes closed knowing that this game controls with WASD and mouse. I was often asked whether I intended for players to open their eyes or keep them closed, in my mind neither is the correct choice but the presence of the tension is whats playful.'
                },
                {
                    html: '<iframe height="167" frameborder="0" src="https://itch.io/embed/374237" width="552"><a href="https://hawkdanny.itch.io/imagine-spring">Imagine Spring by Danny Hawk</a></iframe>'
                }
            ]
        },
        /*{
            name: "Square Up",
            year: 2019,
            logline: "An exploration in radical softness",
            role: "co-designer, programmer",
            tags: ['game', 'video game'],
            headerImageURL: "media/square up header.png",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/k52Y-yWPCIE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'Created with Chris Kindred, Elizabeth Ballou, Virginia Wilkerson, and Siddarth Govindan'
                }
            ]
        },*/
        {
            name: "Perfect Ramen",
            year: 2018,
            logline: "Cooperative chopsticks simulator",
            role: "co-creator",
            tags: ['game', 'video game'],
            headerImageURL: "media/perfect ramen header.png",
            page: [
                {
                    element: 'p',
                    text: 'A slow moving physics game created with <a href="https://twitter.com/ghaoyuxin">Yuxin Gao</a>. We wanted to create a co-op game where you control a singular chopstick and have to work with a partner in order to operate as a pair.'
                },
                {
                    html: '<iframe width="552" height="167" frameborder="0" src="https://itch.io/embed/344961"><a href="https://hawkdanny.itch.io/perfect-ramen">Perfect Ramen by Danny Hawk</a></iframe>'
                }
            ]
        },
        {
            name: "Dam It!",
            year: 2018,
            logline: "A realtime strategy party game",
            role: "co-creator",
            tags: ['game', 'board game'],
            headerImageURL: "media/damit header.jpg",
            page: [
                {
                    element: 'p',
                    text: 'A realtime 1v3 board game pitting three beavers against one river. The team of beaver players must work together to build, dismantle, and rebuild their dams in order to stop the river from reaching their home, all while not talking. The river player must play a strategic game of realtime yahtzee in order to flow over and around the beaver dams.'
                }
            ]
        },
        {
            name: "lit.rocks",
            year: 2018,
            logline: "A collection of virtual rocks",
            role: "creator",
            tags: ['art'],
            headerImageURL: "media/homepage/rock_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'Between undergrad and grad school, I wanted to try and "learn shaders," so I did daily explorations into unity\'s shader graph with the self-applied constraint of using a new rock from this <a href="https://www.lmhpoly.com/game-assets/low-poly-rocks-pack">low poly rock pack</a>. '
                },
                {
                    html: '<p>A full catalogue can be found <a href="https://www.instagram.com/lit.rocks/">here</a>.</p>'
                }
            ]
        },
        {
            name: "Danny Hawk's Boop Game",
            year: 2018,
            logline: "The game where you share and compete",
            role: "creator",
            tags: ['game', 'video game', 'physical computing'],
            headerImageURL: "media/homepage/boop2_homepage.jpg",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dJwRSW0mXaI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    html: '<p>Danny Hawk\'s Boop Game is an iteration on <a href="https://dannyhawk.com/boop/index.html">a prototype I made</a> of a competitive game where players share a piece of their controls. In he updated iteration I placed the shared control further away from the players and on a pedestal in an attempt to make the use of it more of a commitment, but it mostly resulted in players ignoring the option.</p>'
                },
                {
                    element: 'p',
                    text: 'I think the idea of a competitive game with shared controls is worth exploring still, just that Danny Hawk\'s Boop Game is not really the design or control scheme for it.'
                }
            ]
        },
        /*
        {
            name: "Beautiful Series",
            year: 2018,
            logline: "Three interactive artworks about beauty",
            role: "creator",
            tags: ['art', 'physical computing'],
            headerImageURL: "media/homepage/beautiful_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'Small interactive pieces I made around the theme of beauty while I was learning physical computing.'
                }
            ]
        },*/
        {
            name: "Gojira",
            year: 2018,
            logline: "An interactive comparison of Godzilla (1954) and Godzilla (1956)",
            role: "creator",
            tags: ['creative code'],
            headerImageURL: "media/gojira header.png",
            page: [
                {
                    element: 'p',
                    text: 'The 1956 release of Godzilla that was released in the US was a recut and reshoot of the original 1954 version that recontextualizes much of the movie for a US audience. This interactive comparison plays both movies side by side, scene by scene so you can see the subtle and unsubtle ways that the film was changed.'
                },
                {
                    html: '<img src="media/gojira.gif" alt="gojira gif" width="665" height="491">'
                },
            ]
        },
        {
            name: "Narwhal Picnic",
            year: 2017,
            logline: "Put a vive controller on your forehead",
            role: "creator",
            tags: ['game', 'video game'],
            headerImageURL: "media/homepage/narwhal_homepage.jpg",
            page: [
                {
                    html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/mC3KTQK0pqg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
                },
                {
                    element: 'p',
                    text: 'VR was sold on the idea of extremely immersive experiences that assume your removal from the reality around you. Narwhal Picnic was my foray into playing in that gap between the immersion and reality.'
                },
                {
                    html: "<p>I sold my Vive soon after prototyping this. You can download the unity project <a href='https://github.com/HawkDanny/NarwhalPicnic'>here</a></p>"
                }
            ]
        },
        {
            name: "My Dog's Eyes",
            year: 2017,
            logline: "A love letter to my favorite song",
            role: "developer and designer, song from Zammuto",
            tags: ['art', 'creative code'],
            headerImageURL: "media/homepage/dog_homepage.jpg",
            page: [
                {
                    element: 'p',
                    text: 'The artist Zammuto wrote a song titled "My Dog\'s Eyes" and the first time I heard it I literally stopped in my tracks, it would end up my favorite song. The words are an outdated list of children\'s favorite things, and I use the words themselves to construct the moments they describe. This piece is my love letter to the song.'
                },
                {
                    html: '<p>You can watch it <a href="mydogseyes.html">here</a>.</p>'
                }
            ]
        },
        /*
        {
            name: "Boop 1",
            year: 2016,
            logline: "A competitive game where you share the spacebar",
            role: "creator",
            tags: ['game', 'video game'],
            headerImageURL: "media/boop1 header.png",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },*/
        /*
        {
            name: "The Death of Mr. Montague",
            year: 2016,
            logline: "A card game about making up extravagant lies",
            role: "co-designer",
            tags: ['game', 'board game', 'card game'],
            headerImageURL: "media/montagueHeader2.jpg",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },*/
        /*
        {
            name: "Switch Blade",
            year: 2015,
            logline: "My first video game",
            role: "creator",
            tags: ['game', 'video game'],
            headerImageURL: "media/switchblade header.png",
            page: [
                {
                    element: 'p',
                    text: ''
                }
            ]
        },*/
    ]
}
