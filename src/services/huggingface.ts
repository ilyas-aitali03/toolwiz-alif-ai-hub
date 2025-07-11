import { pipeline } from '@huggingface/transformers';

export interface TextGenerationParams {
  prompt: string;
  maxLength?: number;
  temperature?: number;
  topP?: number;
  repetitionPenalty?: number;
  textType?: string;
}

export interface GeneratedText {
  text: string;
  truncated: boolean;
}

export class HuggingFaceService {
  private textGenerator: any = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize the text generation pipeline with a smaller model for better performance
      this.textGenerator = await pipeline(
        'text-generation',
        'Xenova/gpt2',
        { device: 'webgpu' }
      );
      this.isInitialized = true;
    } catch (error) {
      // Fallback to CPU if WebGPU is not available
      try {
        this.textGenerator = await pipeline(
          'text-generation',
          'Xenova/gpt2'
        );
        this.isInitialized = true;
      } catch (fallbackError) {
        console.error('Failed to initialize text generation model:', fallbackError);
        throw new Error('Unable to initialize AI text generation. Please try again later.');
      }
    }
  }

  async generateText(params: TextGenerationParams): Promise<GeneratedText> {
    await this.initialize();

    if (!this.textGenerator) {
      throw new Error('Text generation model not initialized');
    }

    try {
      // Create a contextual prompt based on text type
      const contextPrompt = this.createContextualPrompt(params.prompt, params.textType);

      const result = await this.textGenerator(contextPrompt, {
        max_new_tokens: params.maxLength || 200,
        temperature: params.temperature || 0.7,
        top_p: params.topP || 0.9,
        repetition_penalty: params.repetitionPenalty || 1.1,
        do_sample: true,
        return_full_text: false,
      });

      let generatedText = result[0].generated_text;
      
      // Clean up the generated text
      generatedText = this.cleanGeneratedText(generatedText, params.textType);

      return {
        text: generatedText,
        truncated: result[0].truncated || false,
      };
    } catch (error) {
      console.error('Text generation error:', error);
      throw new Error('Failed to generate text. Please try again.');
    }
  }

  private createContextualPrompt(userPrompt: string, textType?: string): string {
    const typeContexts = {
      article: "Write a comprehensive article about:",
      blog: "Write an engaging blog post about:",
      email: "Write a professional email about:",
      essay: "Write a detailed essay about:",
      story: "Write a creative story about:",
      summary: "Write a concise summary about:",
      'product-description': "Write a compelling product description for:",
      'social-media': "Write an engaging social media post about:",
    };

    const context = typeContexts[textType as keyof typeof typeContexts] || "Write about:";
    return `${context} ${userPrompt}\n\n`;
  }

  private cleanGeneratedText(text: string, textType?: string): string {
    // Remove common artifacts and improve formatting
    let cleaned = text.trim();
    
    // Remove incomplete sentences at the end
    const sentences = cleaned.split(/[.!?]+/);
    if (sentences.length > 1 && sentences[sentences.length - 1].trim().length < 10) {
      sentences.pop();
      cleaned = sentences.join('. ') + '.';
    }
    
    // Add proper formatting based on text type
    if (textType === 'email') {
      cleaned = this.formatAsEmail(cleaned);
    } else if (textType === 'blog' || textType === 'article') {
      cleaned = this.formatAsArticle(cleaned);
    }
    
    return cleaned;
  }

  private formatAsEmail(text: string): string {
    if (!text.toLowerCase().includes('dear') && !text.toLowerCase().includes('hello')) {
      text = `Dear [Recipient],\n\n${text}`;
    }
    if (!text.toLowerCase().includes('sincerely') && !text.toLowerCase().includes('best regards')) {
      text += '\n\nBest regards,\n[Your Name]';
    }
    return text;
  }

  private formatAsArticle(text: string): string {
    // Add basic paragraph formatting
    const paragraphs = text.split('\n').filter(p => p.trim());
    return paragraphs.map(p => p.trim()).join('\n\n');
  }
}