// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const randomBase = this.dna[randomIndex];
      let newRandomBase = returnRandBase();
      while (newRandomBase === randomBase) {
        newRandomBase = returnRandBase();
      }
      this.dna[randomIndex] = newRandomBase;
      console.log(randomIndex);
      return this.dna;
    },
    compareDNA(pAequor) {
      let commonDNA = 0;
      for (let i = 0; i < pAequor.dna.length; i++){ // replace with flter
        if (pAequor.dna[i] === this.dna[i]){
          commonDNA++;
        }  
      }
      const percentage = Math.round(commonDNA / pAequor.dna.length * 100);
      console.log(`Specimen ${pAequor.specimenNum} and specimen ${this.specimenNum} have ${percentage}% DNA in common`)
    },
  }
}

const specimen1 = pAequorFactory(1, mockUpStrand());
const specimen2 = pAequorFactory(2, mockUpStrand());
console.log(specimen1.dna);
console.log(specimen2.dna);
specimen1.compareDNA(specimen2);

const specimen3 = pAequorFactory(3, ['A', 'B', 'C', 'D']);
const specimen4 = pAequorFactory(4, ['A', 'B', 'C', 'J']);
console.log(specimen3.dna);
console.log(specimen4.dna);
specimen3.compareDNA(specimen4);

