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

// Create a pAequor specimen with an ID and a DNA
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    /**
     * Randomly change a base in dna array to a different one
     * @returns Array
     */
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
    /**
     * Log a message that say how much similarity there is beetween 2 arrays
     * @param {Array} pAequor 
     */
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
    /**
     * Return true if dna contains at least 60% 'C' or 'G' bases
     * @returns boolean
     */
    willLikelySurvive() {
      const cOrGBase = this.dna.filter(base => base === 'C' || base === 'G');
      return cOrGBase.length / this.dna.length * 100 >= 60;
    },
    /**
     * Return the complementary DNA strand following the rule in : 
     * https://discoveringthegenome.org/discovering-genome/dna-sequencing/dna-complementary-base-pairing
     * @returns Array
     */
    complementStrand() {
      const complementStrand = [];
      this.dna.forEach(base => {
        if (base === 'A') {
          complementStrand.push('T');
        } else if (base === 'T') {
          complementStrand.push('A');
        } else if (base === 'C') {
          complementStrand.push('G');
        } else if (base === 'G') {
          complementStrand.push('C');
        } 
      });
      return complementStrand;
    }
  }
};

/**
 * Return a list of surviving specimen using pAequorFactory() and willLikelySurvive() rule
 * @param {number} numOfSpecimen 
 * @returns Array
 */
const survivingPAequors = (numOfSpecimen) => {
  const pAequors = [];
  let specimenNum = 1;
    while (pAequors.length < numOfSpecimen) {
      let newSpecimen = pAequorFactory(specimenNum, mockUpStrand());
      if (newSpecimen.willLikelySurvive()) {
        pAequors.push(newSpecimen);
      }
      specimenNum++;
    }
  return pAequors;
};
