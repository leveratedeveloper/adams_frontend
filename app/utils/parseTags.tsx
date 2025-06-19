export function parseTags(tagsJson: string): string[] {
    try {
      const parsed = JSON.parse(tagsJson);
  
      if (!Array.isArray(parsed)) return [];
  
      return parsed.map(tag => {
        try {
          const name = JSON.parse(tag.name);
          return name.en ?? '';
        } catch {
          return tag.name ?? '';
        }
      });
    } catch {
      return [];
    }
  }
  