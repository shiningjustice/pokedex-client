const conversions = {
  /**
 * 
 * @param {num} height in decimeters
 * @returns {str} height in feet and inches, format `1' 3'`
 */
  convertHeight(height) {
    const ratioDeciToInch = 3.937008;
    const heightinInches = height * ratioDeciToInch;
    const feet = Math.floor(heightinInches / 12);
    const inches = Math.round(heightinInches % 12);
    
    if (!feet) {
      return `${inches}"` 
    } else if (!inches) {
      return `${feet}`
    } else {
      return `${feet}' ${inches}"`
    }
  },
  /**
   * @returns weight in pounds, with 2 decimal places at most if necessary
   * @param {num} weight - weight in hectograms, per API 
   */
  convertWeight(weight) {
    const ratioHectoGToLbs = 0.2204623;
    const weightInLbs = weight * ratioHectoGToLbs;

    if (weightInLbs < 1) {
      return `${Math.round((weightInLbs + Number.EPSILON) * 100) / 100} lbs`;
    } 

    return `${Math.round(weightInLbs)} lbs`;
  }

}


export default conversions;