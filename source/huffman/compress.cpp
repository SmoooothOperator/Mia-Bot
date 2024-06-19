using namespace std;
#include "HCTree.hpp"
#include "Helper.hpp"



int main(int argc, char* argv[]) {
    
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
    //Read byte by byte until end
    int syb;
    int encoded = 0;

    while((syb = input -> read_byte())!= -1){
        //Increment the count of corresponding symbol
        freqs[syb]++;
        encoded++;
    }
    //Test code
    // cout << input -> filesize() << endl;

    //Build the huffman tree
    HCTree* hctree = new HCTree();
    hctree -> build(freqs);

   

    //Handle output Stream errors
    if(output -> good() == false){
        cerr << "OutputStream Error!" << endl;
        return 0;
    }

    //Iterate over freq vector
    for (int value : freqs) {
        //Get the 3 right most bytes
        unsigned char b1 = static_cast<unsigned char>(value >> 8);
        unsigned char b2 = static_cast<unsigned char>((value >> 4) & 0x000f);
        unsigned char b3 = static_cast<unsigned char>(value & 0x000f);

        //Write the Bytes to file
        output -> write_byte(b1);
        output -> write_byte(b2);
        output -> write_byte(b3);
        output -> flush();
    }

    //Return input stream to start
    input -> reset();

    
    //Read byte by byte until end
    while((syb = input -> read_byte())!= -1){
        //encode the symbol
        unsigned char symbol = static_cast<unsigned char>(syb);
        hctree -> encode(symbol, *output);
        encoded--;
    }
    cout<<endl;
    //Flush buffers
    output -> flush_bitwise();
    output -> flush();


    // Deallocate Memory
    delete hctree;
    delete input;
    delete output;
    

}
