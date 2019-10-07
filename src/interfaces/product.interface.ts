
export interface Product {

  readonly id?: string,
  readonly code: string,
  readonly name: string,
  readonly scoringRuleID: string,
  readonly score: string,
  readonly extraScore: string,
  readonly imageURL?: string,
  readonly activated: boolean,
  readonly storeID: string
}