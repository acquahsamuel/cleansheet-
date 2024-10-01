import { ChangeDetectorRef, forwardRef, Component, OnInit } from '@angular/core';
import { InteractionService } from '../../services/interaction.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss'],
  
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomEditorComponent),
      multi: true
    }
  ]
})
export class CustomEditorComponent implements ControlValueAccessor, OnInit {
  editorContent: string = '';
  MESSAGE_ENGAGEMENT = [];
  MESSAGE : any;
  onChange: any = () => {};
  onTouched: any = () => {};


  constructor(
    private interactionService : InteractionService, 
    private _cdr : ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

 
  setAlignment(alignment: 'left' | 'center' | 'right') {
    document.execCommand('justify' + alignment, false, '');
    this.onContentChange();
  }


  format(command: string, value?: string) {
    document.execCommand(command, false, value);
    this.onContentChange();
  }


  onContentChange() {
    this.editorContent = document.querySelector('.editor')?.innerHTML || '';
    this.onChange(this.editorContent); 
  }

 


  generateText() {
    console.log(this.editorContent, "CONETNEST");
    this.interactionService.initiateInteraction(this.editorContent).subscribe({
      next  : (response : any) =>{
        console.log(response, "SEND RESPONSE")
        this.MESSAGE_ENGAGEMENT = response.previous;
         
        
      },
      complete : () => {
        // this.editorContent.reset();
      }
    })
   
  }


    
    writeValue(value: string): void {
      this.editorContent = value || '';  
      this._cdr.markForCheck();  
    }
  
    


    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
     
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }



    onBlur() {
      this.onTouched(); // Mark as touched
    }
    
}
