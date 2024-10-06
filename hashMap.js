class hashMap {
    constructor(loadFactor = 0.75,initialCapacity = 16){
        this.buckets = new Array(initialCapacity).fill(null);
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity
        this.size = 0
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        

        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value){
        // dynamic resizing when bucket is becoming full
        if (this.size >= this.capacity * this.loadFactor) {
            this.resize();
        }
        
        if(!this.buckets[this.hash(key)]){
            this.buckets[this.hash(key)] = []
        }

        for (let i = 0; i < this.buckets[this.hash(key)].length; i++) {
            if (this.buckets[this.hash(key)][i][0] === key) {
              this.buckets[this.hash(key)][i][1] = value;
              return;
            }
        }
        this.buckets[this.hash(key)].push([key, value]);
        this.size++;
    }
    
    get(key){
        let index = this.hash(key)
        for (let i = 0; i < this.capacity; i++) {
                if(this.buckets[index][i][0] == key){
                    return this.buckets[index][i][1]
                
            }
            
        }
    }
    
    has(key){
        let index = this.hash(key);
            if (this.buckets[index]) {
                for (let i = 0; i < this.buckets[index].length; i++) {
                if (this.buckets[index][i][0] === key) {
                    return true;
                }
                }
            }
            return false;
            
    }

    remove(key) {
        const index = this.hash(key);
        if (this.buckets[index]) {
          for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
              // Remove the key-value pair from the bucket
              this.buckets[index].splice(i, 1);
              this.size--;
              
              // If the bucket is now empty, set it to null
              if (this.buckets[index].length === 0) {
                this.buckets[index] = null;
              }
              
              return true;
            }
          }
        }
        return false;
      }

    length(){
        return this.size
    }

    clear(){
        this.buckets = []
    }

    keys(){
        let keys = []
        this.buckets.forEach(bucket => {
            bucket.forEach(element => {
                keys.push(element[0])
            });
        });
        return keys
    }

    values(){
        let values = []
        this.buckets.forEach(bucket => {
            bucket.forEach(element => {
                keys.push(element[1])
            });
        });
        return values
    }

    entries(){
        const allEntries = [];
        for (let i = 0; i < this.capacity; i++) {
          if (this.buckets[i]) {
            for (let j = 0; j < this.buckets[i].length; j++) {
              allEntries.push(this.buckets[i][j]);
            }
          }
        }
        return allEntries;
    }
    
    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity).fill(null);
        for (let i = 0; i < this.capacity; i++) {
          if (this.buckets[i]) {
            for (let j = 0; j < this.buckets[i].length; j++) {
              const [key, value] = this.buckets[i][j];
              const newIndex = this.hash(key) % newCapacity;
              if (!newBuckets[newIndex]) {
                newBuckets[newIndex] = [];
              }
              newBuckets[newIndex].push([key, value]);
            }
          }
        }
        this.buckets = newBuckets;
        this.capacity = newCapacity;
      }
}


export {hashMap}