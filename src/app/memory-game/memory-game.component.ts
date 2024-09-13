import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Card {
  id: number;
  image: string;
}

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent {
  numberOfCards: number = 8;
  cards: Card[] = [];
  flippedCards: Set<number> = new Set();
  selectedCards: number[] = [];
  cardsToBeRemoved: number[] = [];
  score: number = 0;
  images: string[] = [
	'https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/6189298c-a399-463a-b09c-646bf4c62ab4.avif',
    'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg/1024px-2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank%E2%80%93129_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Luis_Suarez_en_Gr%C3%AAmio.jpg/1024px-Luis_Suarez_en_Gr%C3%AAmio.jpg',
    'https://s.hs-data.com/bilder/spieler/gross/119750.jpg?fallback=png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Karim_Benzema_wearing_Real_Madrid_home_kit_2021-2022.jpg/1024px-Karim_Benzema_wearing_Real_Madrid_home_kit_2021-2022.jpg',
    'https://s.hs-data.com/bilder/spieler/gross/43855.jpg?fallback=png',
    'https://upload.wikimedia.org/wikipedia/commons/c/c4/Courtois_2018_%28cropped%29.jpg',
    'https://s.hs-data.com/bilder/spieler/gross/69147.jpg?fallback=png',
    'https://upload.wikimedia.org/wikipedia/commons/2/29/Antoine_Griezmann_World_Cup_Trophy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Pele_con_brasil_%28cropped%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/1024px-Maradona-Mundial_86_con_la_copa.JPG',
    'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRJ4A7sfvL27o_O3NPRpqHgN0ZZ4x-LgUIUycA5pVlbe6-yCwfk',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Johan_Cruyff_1974c.jpg/1024px-Johan_Cruyff_1974c.jpg',
    'https://assets.goal.com/images/v3/blt77343c47650bbfc1/2342f72fb9136c85780213e2ad65de2843a40911.jpg?auto=webp&format=pjpg&width=828&quality=60'
  ];

  /**
   * Metodo para generar cartas
   */
  generateCards(): void {
    const validCardNumber = Math.max(this.numberOfCards, 8);
    const numberOfPairs = validCardNumber / 2;
    const selectedImages = this.images.slice(0, numberOfPairs);

    const initialCards: Card[] = selectedImages.flatMap((image, index) => [
      { id: index * 2 + 1, image },
      { id: index * 2 + 2, image }
    ]);

    this.cards = this.shuffle(initialCards);
    this.flippedCards.clear();
    this.selectedCards = [];
    this.cardsToBeRemoved = [];
    this.score = 0;
  }

  /**
   * Metodo para mezclar las cartas
   */
  shuffle(array: Card[]): Card[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Metodo que Cambia el estado de la carta si esta girada o no.
   */
  toggleCard(id: number): void {
    if (this.flippedCards.size < 2 && !this.flippedCards.has(id) && !this.cardsToBeRemoved.includes(id)) {
      this.flippedCards.add(id);
      this.selectedCards.push(id);

      if (this.selectedCards.length === 2) {
        this.checkForMatch();
      }
    }
  }

  /**
   * Metodo que verifica si dos cartas coinciden.
   */
  checkForMatch(): void {
	// console.log(1);
    const [firstId, secondId] = this.selectedCards;
    const firstCard = this.cards.find(card => card.id === firstId);
    const secondCard = this.cards.find(card => card.id === secondId);

    if (firstCard && secondCard && (firstCard.image === secondCard.image)) {
      this.score += 1;
      this.cardsToBeRemoved.push(firstId, secondId);
	  console.log(firstCard, secondCard);
      setTimeout(() => {
        this.cards = this.cards.filter(card => !this.cardsToBeRemoved.includes(card.id));
        this.cardsToBeRemoved = [];
        this.flippedCards.clear();  // Limpia las cartas volteadas después de hacer match.
		    this.selectedCards = [];  
      }, 500);
    } else {
      setTimeout(() => {
        this.flippedCards.delete(firstId);
        this.flippedCards.delete(secondId);
		console.log(this.flippedCards);
        this.selectedCards = [];  // Limpia las cartas seleccionadas si no hacen match
      }, 1000);
    }
  }

  /**
   * Metodo que detecta si una carta esta girada.
   */
  isFlipped(id: number): boolean {
    return this.flippedCards.has(id);
  }
}
