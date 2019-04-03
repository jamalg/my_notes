import { denormalize } from 'normalizr'

import * as schemas from './schemas'

export const getHydratedCategories = (state) => denormalize( state.get("categories"), [ schemas.category ] , state)
export const getCategoriesFetchStatus = (state) => state.getIn(["allCategories", "frontStatus"])
