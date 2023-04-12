import Page from './page';

class BankListPage extends Page {
    get searchBox() { return $('/html/body/main/section[2]/div/div/div[1]/div[2]/label/input') }
    get tableInfo() { return $('#DataTables_Table_0_info') }
    get tableBody() { return $('/html/body/main/section[2]/div/div/div[2]/table/tbody') }
    get tableHeader() { return $('thead[class="dataTables-content-header bg-blue"]') }
    get tablePage() { return $('/html/body/main/section[2]/div/div/div[1]/div[4]/span') }

    public open() {
        super.open('https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/index.html')
    }

    public async search(text: string) {
        await this.searchBox.click()
        await this.searchBox.setValue(text);
    }

    public async sort() {
        var elem = await this.tableHeader.$$('th')[2];
        await elem.click();
        await console.log(await elem.getText());
    }

    public async checkSort() {
        var success = false;
        await this.tableBody.waitForDisplayed();
        var row = this.tableBody.$$('tr[role="row"]')[0];
        var prop = await row.$$('td')[2].getAttribute('class');
        console.log("DEBUG: ELEMENT ATTRIBUTE" + prop);
        if (prop == "sorting_1") { //check if table column has sort attribute
            console.log("DEBUG: ATTRIBUTE MATCH SORT CONFIRM");
            success = true;
        }
        return success;
    }

    public async checkTable(text: string) {
        await this.tableBody.waitForDisplayed();
        var success = true;
        var falseMatches = 0; //increment when text doesn't match search term then compare this number to the number of fields
        var rows = await this.tableBody.$$('tr[role="row"]');
        for (var row of rows) {
            var children = await row.$$('td');
            for (var child of children) {
                var temp = await child.getText();
                if (!temp.includes(text)) {
                    falseMatches++;
                }
                else {
                    console.log("MATCH FOUND|| Text: " + text + "::: Child:" + temp);
                }
            }
            if (falseMatches == 7) { //if every column of a row fails to contain search term then search is a failure
                success = false;
            }
        }
        console.log(success);
        return success;
    }

    public async changePage(pageNum: number) {
        var elem = await this.tablePage.$$('a')[pageNum - 1];
        elem.click();
    }

    public async checkPage() {
        const pageSize = 12;
        var success = false;

        var text = await this.tableInfo.getText();
        var array = text.split(" ");
        text = array[1];
        var num = parseInt(text);
        num -= 1;

        if (num % pageSize == 0) { //check if number is multiple of page size
            success = true;
        }

        console.log("NUMBER: " + num);
        console.log("MODULUS RESULT: " + num % pageSize);

        return success;
    }


}

export default new BankListPage();