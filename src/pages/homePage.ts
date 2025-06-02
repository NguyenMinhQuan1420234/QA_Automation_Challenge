import { Page } from '@playwright/test'
import {test} from '../fixture/fixture'
import { testInfo } from '../base/baseFunction';

export interface SearchScenario extends testInfo {
    searchfiled: string
    value: string
    expectResults: boolean
}
