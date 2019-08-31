

export class PlayerStatus {

    public inactive: boolean;
    public longInactive: boolean;
    public vacation: boolean;
    public administrator: boolean;

    public constructor(encodedData: string) {

        this.inactive = encodedData.includes("i");
        this.longInactive = encodedData.includes("I");
        this.vacation = encodedData.includes("v");
        this.administrator = encodedData.includes("a");

    }

    public toString() {

        return [this.vacation && "v", this.longInactive && "I", this.inactive && "i", this.administrator && "a"]
            .filter(v => !!v)
            .join("");

    }

}