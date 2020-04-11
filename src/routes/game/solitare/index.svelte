<!--<style>-->
<!--    .grid-container {-->
<!--        display: grid;-->
<!--        grid-template-columns: auto 250px;-->
<!--    }-->
<!--</style>-->

<!--<script>-->
<!--    import Chat from "../../../components/Chat.svelte";-->
<!--    import styled from "styled-components";-->

<!--    let shuffleCards = (includeJokers = false) => {-->
<!--        /* Return an array of 52 cards (if jokers is false, 54 otherwise) */-->
<!--        let cards = [];-->
<!--        ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {-->
<!--            ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"].forEach(-->
<!--                    value => {-->
<!--                        cards.push({ suit: suit, value: value });-->
<!--                    }-->
<!--            );-->
<!--        });-->
<!--        // Add in jokers here-->
<!--        if (includeJokers) {-->
<!--            /*...*/-->
<!--        }-->
<!--        // Now shuffle-->
<!--        let deck = [];-->
<!--        while (cards.length > 0) {-->
<!--            // Find a random number between 0 and cards.length - 1-->
<!--            const index = Math.floor(Math.random() * cards.length);-->
<!--            deck.push(cards[index]);-->
<!--            cards.splice(index, 1);-->
<!--        }-->
<!--        return deck;-->
<!--    };-->

<!--    let initialState = () => {-->
<!--        /* Use the above function.  Generate and return an initial state for a game */-->
<!--        let state = {-->
<!--            pile1: [],-->
<!--            pile2: [],-->
<!--            pile3: [],-->
<!--            pile4: [],-->
<!--            pile5: [],-->
<!--            pile6: [],-->
<!--            pile7: [],-->
<!--            stack1: [],-->
<!--            stack2: [],-->
<!--            stack3: [],-->
<!--            stack4: [],-->
<!--            draw: [],-->
<!--            discard: []-->
<!--        };-->

<!--        // Get the shuffled deck and distribute it to the players-->
<!--        const deck = shuffleCards(false);-->
<!--        // Setup the piles-->
<!--        for (let i = 1; i <= 7; ++i) {-->
<!--            let card = deck.splice(0, 1)[0];-->
<!--            card.up = true;-->
<!--            state[`pile${i}`].push(card);-->
<!--            for (let j = i + 1; j <= 7; ++j) {-->
<!--                card = deck.splice(0, 1)[0];-->
<!--                card.up = false;-->
<!--                state[`pile${j}`].push(card);-->
<!--            }-->
<!--        }-->
<!--        // Finally, get the draw right-->
<!--        state.draw = deck.map(card => {-->
<!--            card.up = false;-->
<!--            return card;-->
<!--        });-->
<!--        return state;-->
<!--    };-->

<!--    const validateMove = (move, state) => {-->
<!--        // Return either error or state of game after a valid move-->
<!--        let source = move.src;-->
<!--        let destination = move.dst;-->
<!--        let card = move.cards[0];-->

<!--        let pile = state.state[destination];-->
<!--        let length = state.state[destination].length;-->
<!--        try {-->
<!--            if (destination === "draw") {-->
<!--                return null;-->
<!--            } else if (destination === "discard") {-->
<!--                if(source !== "draw") {-->
<!--                    return null;-->
<!--                } else if(state.state[source].length === 0) {-->
<!--                    for(let i = 0; i < length; i++) {-->
<!--                        let newCards = {};-->
<!--                        newCards["up"] = false;-->
<!--                        newCards["suit"] = pile[i].suit;-->
<!--                        newCards["value"] = pile[i].value;-->
<!--                        state.state[source].push(newCards);-->
<!--                    }-->
<!--                    state.state[destination].splice(0, length);-->
<!--                    return state.state;-->
<!--                }-->
<!--            } else if ((destination === "stack1" || destination === "stack2" || destination === "stack3" ||-->
<!--                    destination === "stack4")) {-->
<!--                if(move["cards"].length > 1) {-->
<!--                    return null;-->
<!--                }-->
<!--                if(length === 0) {-->
<!--                    if(card.value !== "ace") {-->
<!--                        return null;-->
<!--                    }-->
<!--                } else if(pile[0].suit !== card.suit) {-->
<!--                    return null;-->
<!--                } else if(pile[length - 1].value === "10" ||-->
<!--                        pile[length-1].value === "jack" ||-->
<!--                        pile[length-1].value === "queen" ||-->
<!--                        pile[length-1].value === "king" ||-->
<!--                        pile[length-1].value === "ace") {-->
<!--                    if((pile[length-1].value === "10" && card.value !== "jack") ||-->
<!--                            (pile[length-1].value === "jack" && card.value !== "queen") ||-->
<!--                            (pile[length-1].value === "queen" && card.value !== "king") ||-->
<!--                            (pile[length-1].value === "king") ||-->
<!--                            (pile[length-1].value === "ace" && card.value !== "2")) {-->
<!--                        return null;-->
<!--                    }-->
<!--                } else {-->
<!--                    let dest = parseInt(pile[length-1].value);-->
<!--                    let src = parseInt(card.value);-->

<!--                    if(src - 1 !== dest) {-->
<!--                        return null;-->
<!--                    }-->
<!--                }-->
<!--            } else {-->
<!--                if(length !== 0) {-->
<!--                    if(pile[length-1].suit === "hearts" ||-->
<!--                            pile[length-1].suit === "diamonds") {-->
<!--                        if(card.suit !== "spades" && card.suit !== "clubs") {-->
<!--                            return null;-->
<!--                        }-->
<!--                    }-->
<!--                    if(pile[length-1].suit === "spades" ||-->
<!--                            pile[length-1].suit === "clubs") {-->
<!--                        if(card.suit !== "hearts" && card.suit !== "diamonds") {-->
<!--                            return null;-->
<!--                        }-->
<!--                    }-->

<!--                    if(pile[length-1].value === "jack" ||-->
<!--                            pile[length-1].value === "queen" ||-->
<!--                            pile[length-1].value === "king" ||-->
<!--                            pile[length-1].value === "ace") {-->
<!--                        if ((pile[length-1].value === "jack" && card.value !== "10") ||-->
<!--                                (pile[length-1].value === "queen" && card.value !== "jack") ||-->
<!--                                (pile[length-1].value === "king" && card.value !== "queen") ||-->
<!--                                (pile[length-1].value === "ace")) {-->
<!--                            return null;-->
<!--                        }-->
<!--                    } else {-->
<!--                        let dest = parseInt(pile[length-1].value);-->
<!--                        let src = parseInt(card.value);-->

<!--                        if(src + 1 !== dest) {-->
<!--                            return null;-->
<!--                        }-->
<!--                    }-->
<!--                } else {-->
<!--                    if(card.value !== "king") {-->
<!--                        return null;-->
<!--                    }-->
<!--                }-->
<!--            }-->

<!--            for(let i = 0; i < move.cards.length; i++) {-->
<!--                let newCards = {};-->
<!--                newCards["up"] = true;-->
<!--                newCards["suit"] = move.cards[i].suit;-->
<!--                newCards["value"] = move.cards[i].value;-->
<!--                pile.push(newCards);-->
<!--            }-->

<!--            if(destination !== "discard") {-->
<!--                state.state[source].splice(state.state[source].length - move.cards.length, move.cards.length);-->
<!--                if(state.state[source].length > 0) {-->
<!--                    state.state[source][state.state[source].length - 1].up = true;-->
<!--                }-->
<!--            } else {-->
<!--                state.state[source].splice(0, 1);-->
<!--            }-->

<!--            return state.state;-->
<!--        }-->
<!--        catch (err) {-->
<!--            console.log(err);-->
<!--        }-->
<!--    };-->

<!--    const PileBase = styled.div`-->
<!--  margin: 5px;-->
<!--  position: relative;-->
<!--  display: inline-block;-->
<!--  border: dashed 2px #808080;-->
<!--  border-radius: 5px;-->
<!--  width: 12%;-->
<!--`;-->

<!--    const PileFrame = styled.div`-->
<!--  margin-top: 140%;-->
<!--`;-->
<!--    const CardRowGap = styled.div`-->
<!--  flex-grow: 2;-->
<!--`;-->
<!--    const CardRow = styled.div`-->
<!--  position: relative;-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  flex-wrap: nowrap;-->
<!--  justify-content: center;-->
<!--  align-items: flex-start;-->
<!--  margin-bottom: 2em;-->
<!--`;-->

<!--    const CardRowGap = styled.div`-->
<!--  flex-grow: 2;-->
<!--`;-->

<!--    const GameBase = styled.div`-->
<!--  grid-row: 2;-->
<!--  grid-column: sb / main;-->
<!--`;-->
<!--    const CardImg = styled.img`-->
<!--  position: absolute;-->
<!--  height: auto;-->
<!--  width: 100%;-->
<!--`;-->

<!--    export const Card = ({ card, top, left, onClick }) => {-->
<!--        const source = card.up-->
<!--                ? `/images/${card.value}_of_${card.suit}.png`-->
<!--                : "/images/face_down.jpg";-->
<!--        const style = { left: `${left}%`, top: `${top}%` };-->
<!--        const id = `${card.suit}:${card.value}`;-->
<!--        // return <CardImg id={id} onClick={onClick} style={style} src={source} />;-->
<!--    };-->

<!--    handleClick = (location, piles, ev) => {-->
<!--        if(!this.state.move && location !== "draw") {-->
<!--            this.state.moveCard = {};-->
<!--            let pos = 0;-->
<!--            for(let i = 0; i < piles.length; i++) {-->
<!--                let cardInfo = ev.target.id.split(':');-->
<!--                if(piles[i].suit === cardInfo[0] && piles[i].value === cardInfo[1]) {-->
<!--                    pos = i;-->
<!--                    break;-->
<!--                }-->
<!--            }-->

<!--            if(piles[pos].up) {-->
<!--                let cards = [];-->
<!--                for(let i = pos; i < piles.length; i++) {-->
<!--                    if(piles[i].up) {-->
<!--                        let card = {};-->
<!--                        card["suit"] = piles[i].suit;-->
<!--                        card["value"] = piles[i].value;-->
<!--                        cards.push(card);-->
<!--                    }-->
<!--                }-->
<!--                this.state.moveCard["cards"] = cards;-->
<!--                this.state.moveCard["src"] = location;-->
<!--                this.state.move = true;-->
<!--            }-->
<!--        } else {-->
<!--            if(location === "draw") {-->
<!--                let cards = [];-->
<!--                let card = {};-->
<!--                if(this.state.draw.length > 0) {-->
<!--                    card["suit"] = piles[0].suit;-->
<!--                    card["value"] = piles[0].value;-->
<!--                } else {-->
<!--                    card["suit"] = "diamond";-->
<!--                }-->
<!--                cards.push(card);-->
<!--                this.state.moveCard["cards"] = cards;-->
<!--                this.state.moveCard["src"] = location;-->
<!--                this.state.moveCard["dst"] = "discard";-->
<!--            } else {-->
<!--                this.state.moveCard["dst"] = location;-->
<!--            }-->

<!--            console.log(JSON.stringify(this.state.moveCard));-->

<!--            fetch(`/v1/game/${this.props.match.params.id}`, {-->
<!--                method: 'PUT',-->
<!--                headers: {-->
<!--                    'Content-Type': 'application/json'-->
<!--                },-->
<!--                body: JSON.stringify(this.state.moveCard)-->
<!--            })-->
<!--                    .then(res => res.json())-->
<!--                    .then(data => this.setState({-->
<!--                        pile1: data.pile1,-->
<!--                        pile2: data.pile2,-->
<!--                        pile3: data.pile3,-->
<!--                        pile4: data.pile4,-->
<!--                        pile5: data.pile5,-->
<!--                        pile6: data.pile6,-->
<!--                        pile7: data.pile7,-->
<!--                        stack1: data.stack1,-->
<!--                        stack2: data.stack2,-->
<!--                        stack3: data.stack3,-->
<!--                        stack4: data.stack4,-->
<!--                        draw: data.draw,-->
<!--                        discard: data.discard-->
<!--                    }))-->
<!--                    .catch(data => this.setState({-->
<!--                        pile1: data.pile1,-->
<!--                        pile2: data.pile2,-->
<!--                        pile3: data.pile3,-->
<!--                        pile4: data.pile4,-->
<!--                        pile5: data.pile5,-->
<!--                        pile6: data.pile6,-->
<!--                        pile7: data.pile7,-->
<!--                        stack1: data.stack1,-->
<!--                        stack2: data.stack2,-->
<!--                        stack3: data.stack3,-->
<!--                        stack4: data.stack4,-->
<!--                        draw: data.draw,-->
<!--                        discard: data.discard },-->
<!--                    ));-->

<!--            this.state.move = false;-->
<!--        }-->
<!--    };-->


<!--    export const Pile = ({ cards, spacing, horizontal, up, onClick }) => {-->
<!--        const children = cards.map((card, i) => {-->
<!--            let top = horizontal ? 0 : i * spacing;-->
<!--            let left = horizontal ? i * spacing : 0;-->
<!--            // return ( <Card key={i} card={card} up={up} top={top} left={left} /> );-->
<!--        });-->
<!--        // return ( <PileBase onClick={onClick}>-->
<!--        //             <PileFrame />-->
<!--        //             {children}-->
<!--        //         </PileBase> );-->
<!--    };-->


<!--</script>-->

<svelte:head>
    <title>Playing Solitare</title>
</svelte:head>

<div class="grid-container">
<!--    <GameBase>-->
<!--        <CardRow>-->
<!--            <Pile cards={this.state.stack1} spacing={0} onClick={this.onClick.bind(this, "stack1", this.state.stack1)}/>-->
<!--            <Pile cards={this.state.stack2} spacing={0} onClick={this.onClick.bind(this, "stack2", this.state.stack2)} />-->
<!--            <Pile cards={this.state.stack3} spacing={0} onClick={this.onClick.bind(this, "stack3", this.state.stack3)} />-->
<!--            <Pile cards={this.state.stack4} spacing={0} onClick={this.onClick.bind(this, "stack4", this.state.stack4)} />-->
<!--            <CardRowGap />-->
<!--            <Pile cards={this.state.draw} spacing={0} onClick={this.onClick.bind(this, "draw", this.state.draw)} />-->
<!--            <Pile cards={this.state.discard} spacing={0} onClick={this.onClick.bind(this, "discard", this.state.discard)} />-->
<!--        </CardRow>-->
<!--        <CardRow>-->
<!--            <Pile cards={this.state.pile1} onClick={this.onClick.bind(this, "pile1", this.state.pile1)} />-->
<!--            <Pile cards={this.state.pile2} onClick={this.onClick.bind(this, "pile2", this.state.pile2)} />-->
<!--            <Pile cards={this.state.pile3} onClick={this.onClick.bind(this, "pile3", this.state.pile3)} />-->
<!--            <Pile cards={this.state.pile4} onClick={this.onClick.bind(this, "pile4", this.state.pile4)} />-->
<!--            <Pile cards={this.state.pile5} onClick={this.onClick.bind(this, "pile5", this.state.pile5)} />-->
<!--            <Pile cards={this.state.pile6} onClick={this.onClick.bind(this, "pile6", this.state.pile6)} />-->
<!--            <Pile cards={this.state.pile7} onClick={this.onClick.bind(this, "pile7", this.state.pile7)} />-->
<!--        </CardRow>-->
<!--    </GameBase>-->
<!--    <div class="grid-item">-->
<!--        <Chat />-->
<!--    </div>-->
</div>
