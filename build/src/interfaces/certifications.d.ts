export interface MovieCertifications {
    certifications: MCertifications;
}
export interface TVCertifications {
    certifications: TCertifications;
}
export interface Certification {
    certification?: string;
    meaning?: string;
    order?: number;
}
export interface MCertifications {
    US: Certification[];
    CA: Certification[];
    DE: Certification[];
    GB: Certification[];
    AU: Certification[];
    BR: Certification[];
    FR: Certification[];
    NZ: Certification[];
    IN: Certification[];
}
export interface TCertifications {
    US: Certification[];
    CA: Certification[];
    AU: Certification[];
    FR: Certification[];
    RU: Certification[];
    DE: Certification[];
    TH: Certification[];
    KR: Certification[];
    GB: Certification[];
    BR: Certification[];
}
