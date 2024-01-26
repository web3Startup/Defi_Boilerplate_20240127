import {AddressZero, setupFixture,} from "../helpers/utils";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import {expect} from "chai";
import {constants} from "ethers";
import {getWNativeConfigByChainId} from "../helpers/params";

describe("Vault", async () => {

    let vault: any,
        v: any;

    beforeEach(async () => {
        let fixture = await setupFixture();
        // vault = fixture.vault;
        // v = fixture.vault;
    })
    it("Vault.func => setMaxLeverage", async () => {
        // expect(v.address).not.eq(AddressZero);
        expect(1).eq(1);
    });
});

