import { Component, OnInit, DoCheck, IterableDiffers, DefaultIterableDiffer, CollectionChangeRecord } from '@angular/core';

@Component({
  selector: 'do-check',
  templateUrl: './do-check.component.html',
  styleUrls: ['./do-check.component.css']
})
export class DoCheckComponent implements DoCheck {
  comments: any[];
  iterable: boolean;
  authors: string[];
  texts: string[];
  differ: any;

  constructor(differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
    this.comments = [];
    this.authors = ['Elliot', 'Helen', 'Jenny', 'Joe', 'Justen', 'Matt'];
    this.texts = [
      "Ours is a life of constant reruns. We're always circling back to where",
      "Really cool!",
      "Thanks!"
    ]

    this.addComment();
  }

  ngDoCheck() {
    let changes: DefaultIterableDiffer = this.differ.diff(this.comments);

    if(changes) {
      changes.forEachAddedItem((r: CollectionChangeRecord) => console.log('Added', r.item));
      changes.forEachRemovedItem((r: CollectionChangeRecord) => console.log('Removed', r.item));
    }
  }

  addComment() {
    this.comments.push({
      author: this.getRandomItem(this.authors),
      comment: this.getRandomItem(this.texts),
      likes: this.getRandomInt(20)
    })
  }

  removeComment(comment) {
    let pos = this.comments.indexOf(comment);
    this.comments.splice(pos, 1);
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  getRandomItem(array: string[]): string {
    let pos: number = this.getRandomInt(array.length - 1);
    return array[pos];
  }

}
