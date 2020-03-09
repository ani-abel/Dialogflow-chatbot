import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: "[appDropDown]",
    exportAs: "appDropDown"
})
export class DropDownDirective {
    isOpen: boolean = false;

    @HostListener("click")
    showOverflowNav(): void {
        this.isOpen = !this.isOpen;
    }

    constructor() { }
}