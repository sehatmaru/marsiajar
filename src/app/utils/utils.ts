import { Injectable } from '@angular/core';
import { GeneralEnum } from '../enum/general.enum';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  constant: any;
  base64File: any;
  dialogRef: any;

  constructor(
    private message: MessageService
  ) {
  }

  getToken(): string {
    // const currentUrl = window.location.host;
    // const tokenName = 's' + btoa(currentUrl) + 'S0';
    const token = atob(localStorage.getItem('account.token') || '');
    return token;
  }

  clearAllLocalstorage(): void {
    localStorage.clear();
  }

  currencyFormat(num: any): string {
    let splitDec: any = [];
    if (num.toString().includes('.')) {
      const numDec = num.toFixed(2);
      splitDec = numDec.toString().split('.');
    }

    const numb = splitDec.length ? splitDec[0] : num;
    const decRp = splitDec.length ? splitDec[splitDec.length - 1] : '00';
    const newNumb = numb ? numb.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : numb.toString();
    return newNumb + `.${decRp}`;
  }

  thousandFormat(num: any): string {
    let splitDec: any = [];
    if (num.toString().includes('.')) {
      const numDec = num.toFixed(2);
      splitDec = numDec.toString().split('.');
    }

    const numb = splitDec.length ? splitDec[0] : num;
    const newNumb = numb ? numb.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : numb.toString();
    return newNumb;
  }

  formDataBlob(name: any, file: any, params?: any): any {

    const formData = new FormData();
    const data = file.currentFiles ? file.currentFiles : file.files;
    for (const files of data) {
      formData.set(name, new Blob([files], { type: files.type }), files.name);
    }
    if (params) {
      for (const data of params) {
        formData.set(data.key, data.value);
      }
    }

    return formData;
  }

  downloadFile(data: any): void {
    const arrayBuffer: any = this.base64ToArrayBuffer(data.asBase64String);
    const blob = new Blob([arrayBuffer], { type: data.mimeType });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = data.fileName;
    downloadLink.click();
  }

  base64ToArrayBuffer(base64: string): ArrayBufferLike {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  base64ToFile(fileName: string, base64: string, mimeType: string): void {
    const arrayBuffer: any = this.base64ToArrayBuffer(base64);
    const blob = new Blob([arrayBuffer], { type: mimeType });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  }

  getAllPermission(): any {
    if (localStorage.getItem('menuPermission')) {
      return JSON.parse(
        atob(localStorage.getItem('menuPermission') || '')
      );

    }
  }

  getAccessButton(moduleName: string, btnCode: string): boolean {
    let allMenu = JSON.parse(
      atob(localStorage.getItem('menuPermission') || '')
    );
    let accessButton: any;
    let privileges: any[] = [];

    moduleName.split('.').forEach((e: any) => {
      const idx = allMenu.findIndex((dt: any) => {
        /* remove all special character except / slice, replace white space tobe _ (underscore) and uppercase */
        let label: string = dt.label.replace(/[^a-zA-Z /]/g, '').toUpperCase();
        label = label.replace(/\s+/g, '_');
        return label === e;
      });

      if (idx > -1) {
        allMenu = allMenu[idx].items ? allMenu[idx].items : allMenu[idx];
        privileges = allMenu.button;
      }
    });

    accessButton = privileges.includes(btnCode) ? true : false;
    return accessButton;
  }

  formatDate(date: Date): any {
    const tmpTanggal = date.getDate();
    const tmpBulan = date.getMonth() + 1;
    const tahun = date.getFullYear();

    const tanggal = tmpTanggal <= 9 ? `0${tmpTanggal}` : `${tmpTanggal}`;
    const bulan = tmpBulan <= 9 ? `0${tmpBulan}` : `${tmpBulan}`;

    return `${tahun}-${bulan}-${tanggal}`;
  }

  checkNumberOnly(event: any): any {

    const keycode = event.which;
    const availableKeyCode = [8, 9, 13, 27, 46];
    if ((event.ctrlKey && keycode === 65) || (event.metaKey && keycode === 65) ||
      (event.ctrlKey && (keycode === 118 || keycode === 86)) ||
      (event.ctrlKey && (keycode === 99 || keycode === 67)) ||
      (event.ctrlKey && (keycode === 88)) ||
      (event.metaKey && (keycode === 118 || keycode === 86)) ||
      (event.metaKey && (keycode === 99 || keycode === 67)) ||
      (event.metaKey && (keycode === 88)) ||
      (availableKeyCode.indexOf(keycode) !== -1) || (keycode >= 35 && keycode <= 39)) {
      return true;
    } else {
      if (event.shiftKey || (keycode < 48 || keycode > 57) && (keycode < 96 || keycode > 105)) {
        event.preventDefault();
      }
    }

  }

  getFileIcon(file: any): any {
    const extensions = file.split('.').pop().toUpperCase();
    const eGeneralEnum: GeneralEnum = GeneralEnum['ICON_' + extensions as keyof typeof GeneralEnum];
    return eGeneralEnum;
  }

  getBase64(event: any): any {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve) => {
      const reader = new FileReader();
      const file = event.currentFiles ? event.currentFiles[0] : event.files[0];
      const fileData: any = {};
      fileData.fileName = file.name;

      reader.onload = (e) => {
        fileData.base64Data = (reader.result as string).split(',')[1];
        fileData.mimeType = (reader.result as string).split(',')[0];
        fileData.fullBase64Data = (reader.result as string);

        resolve(fileData);
      };

      reader.readAsDataURL(file);
    });

  }

  fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  getDealerData(e: any): any {
    const resData = e;
    let dealerData = {};
    if (resData.epType === '3') {
      dealerData = {
        mainDealer: resData.epCode,
        groupDealer: '',
        epCodeDealer: ''
      }
    } else if (resData.epType === '5') {
      dealerData = {
        mainDealer: '',
        groupDealer: '',
        epCodeDealer: ''
      }
    } else if (resData.epType === '4') {
      dealerData = {
        mainDealer: resData.groupDealerCode,
        groupDealer: resData.epCode,
        epCodeDealer: ''
      }
    } else {
      dealerData = {
        mainDealer: resData.groupDealerCode,
        groupDealer: resData.areaCode,
        epCodeDealer: resData.epCode
      }
    }
    return dealerData;
  }

  toast(message: string, code: number) {
    if (code == 200) this.success(message)
    else this.error(message)
  }

  success(message: string) {
    this.message.add({ severity: 'success', summary: 'Success', detail: message });
  }

  info(message: string) {
    this.message.add({ severity: 'info', summary: 'Info', detail: message });
  }

  warning(message: string) {
    this.message.add({ severity: 'warning', summary: 'Warning', detail: message });
  }

  error(message: string) {
    this.message.add({ severity: 'error', summary: 'Error', detail: message });
  }

  maskingLongText(input: string) {
    const maxCharacters = 150

    if (input.length <= maxCharacters) {
      return input;
    }

    const maskedAndLimited = input.substring(0, maxCharacters) + '...';

    return maskedAndLimited;
  }
}
