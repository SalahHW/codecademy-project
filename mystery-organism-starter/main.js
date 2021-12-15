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
      for (let i = 0; i < pAequor.dna.length; i++){
        if (pAequor.dna[i] === this.dna[i]){
          commonDNA++;
        }  
      }
      const percentage = Math.round(commonDNA / pAequor.dna.length * 100);
      console.log(`Specimen ${pAequor.specimenNum} and specimen ${this.specimenNum} have ${percentage}% DNA in common`);
    },
    willLikelySurvive() {
      const cOrGBase = this.dna.filter(base => base === 'C' || base === 'G');
      return cOrGBase.length / this.dna.length * 100 >= 60;
    }
  }
};

const survivingPAequors = (numOfSpecimen) => {
  const pAequors = [];
  let specimenNum = 1;
    while (pAequors.length < numOfSpecimen) {
      let newSpecimen = pAequorFactory(specimenNum, mockUpStrand());
      if (newSpecimen.willLikelySurvive()) {
        pAequors.push(newSpecimen);
        specimenNum++;
      }
    }
  return pAequors;
};
