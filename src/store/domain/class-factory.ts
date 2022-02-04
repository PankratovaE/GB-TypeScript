import { HomyProvider } from '../providers/homy/homy-provider.js'
import { FlatRentSdk } from '../../flat-rent-sdk.js'

export function factory(name: string): HomyProvider | FlatRentSdk {
    if (name === 'HomyProvider') {
        return new HomyProvider()
    }
    if ( name === 'FlatRentSdk') {
        return new FlatRentSdk()
    }
}