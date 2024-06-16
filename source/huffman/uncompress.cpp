using namespace std;
#include "HCTree.hpp"
#include "Helper.hpp"


int main(int argc, char* argv[]) {
    //Vector to store freqs
    vector<int> freqs (256,0);

    //New input stream
    FancyInputStream* input = new FancyInputStream(argv[1]);

    //Open output file
    FancyOutputStream* output = new FancyOutputStream(argv[2]);

    if(input -> filesize() == 0){
        output -> flush();
        return 0;
    }
    
    //Handle Stream errors
    if(input -> good() == false){
        cerr << "InputStream Error!" << endl;
        return 0;
    }
    int encoded = 0;
    //Read header
    for(int p = 0; p < 256; p++) {
        //Read 3 bytes at a time
        int b1 = ((input -> read_byte()) << 8);
        int b2 = ((input -> read_byte()) << 4);
        int b3 = input -> read_byte();
        int frequncy = b1 | b2 | b3;
        freqs[p] = frequncy;
        encoded += frequncy;
    }
    // cout << encoded << endl;
    //  cout << input -> filesize() << endl;


    //Build the huffman tree
    HCTree* hctree = new HCTree();
    hctree -> build(freqs);

    

    //Handle output Stream errors
    if(output -> good() == false){
        cerr << "OutputStream Error!" << endl;
        return 0;
    }
    
    //Read the compressed bits
    unsigned char decoded;
    while(encoded != 0){
        (decoded = (hctree -> decode(*input)));
        output -> write_byte(decoded);
        encoded--;
    }
    // cout << encoded << endl;

    //Flush buffer
    output -> flush();

    //Deallocate Memory
    delete hctree;
    delete input;
    delete output;
    
}
