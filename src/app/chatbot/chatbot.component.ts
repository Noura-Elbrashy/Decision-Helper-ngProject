import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'] 
})
export class ChatbotComponent {
  userMessage = '';
  messages: { role: string; content: string }[] = [];


  constructor(private http: HttpClient) {
    const savedMessages = localStorage.getItem('chatHistory');
    this.messages = savedMessages ? JSON.parse(savedMessages) : [{ role: 'assistant', content: 'Hello! How can I help you today?' }];
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ role: 'user', content: this.userMessage });
    this.saveMessages();  

    const body = {
      model: "openai/gpt-3.5-turbo",
      messages: this.messages,
      temperature: 0.7
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.openRouterKey}`,
      'Content-Type': 'application/json'
    });

    this.http.post<any>('https://openrouter.ai/api/v1/chat/completions', body, { headers })
      .subscribe(
        response => {
          const botMessage = response.choices[0]?.message?.content || 'No reply from bot';
          this.messages.push({ role: 'assistant', content: botMessage });
          this.userMessage = '';
          this.saveMessages();  
        },
        error => {
          console.error("API Error:", error);
          this.messages.push({ role: 'assistant', content: ' Request failed. Please try again.' });
          this.saveMessages();
        }
      );
  }

  saveMessages() {
    localStorage.setItem('chatHistory', JSON.stringify(this.messages));
  }

clearChat() {
  this.messages = [{ role: 'assistant', content: 'Chat cleared. How can I help you now?' }];
  this.saveMessages();
}

}
